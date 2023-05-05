
# backend/accounts/views.py

from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import permissions, status 
from rest_framework.response import Response 
from rest_framework.views import APIView 
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404

from .serializers import UserAccountSerializer, UserProfileSerializer
from datetime import datetime
from dateutil.relativedelta import relativedelta
from .models import Gender, Purpose, Occupation, Hobby, AnnualIncome, Prefecture, City, UserAccount, UserProfile
from .serializers import(
GenderSerializer, PurposeSerializer, OccupationSerializer, HobbySerializer, AnnualIncomeSerializer, 
PrefectureSerializer, CitySerializer, UserProfileSerializer
    )  
import time

# User = get_user_model()


# アカウント登録
class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        print('############ RegisterView post')
        try:
            data = request.data
            print(data)
            name = data['name']
            email = data['email'].lower()
            password = data['password']
            
            # ユーザーの存在確認
            if not UserAccount.objects.filter(email=email).exists():
                # ユーザーが存在しない場合は作成
                UserAccount.objects.create_user(name=name, email=email, password=password)
                
                
                print("# backend/accounts/models.py UserManager create_user_profile ")
                user = UserAccount.objects.get(email=email)
                UserProfile.objects.create(user=user, username=user.name)
                return Response(
                    {'success':'ユーザーの作成に成功しました'},
                    status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    {'error':'既に登録されているユーザーです'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except:
            return Response(
                {'error':'アカウント登録時に問題が発生しました RegisterView'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# ユーザー情報取得
class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    
    def get(self, request):
        print('UserView start')
        try:
            user = request.user
            print(user)
            user = UserAccountSerializer(user) 
            
            return Response(
                {'user': user.data}, 
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error':'ユーザーの取得に問題が発生しました UserView'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# サブスク請求
class SubscriptionView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post (self, request):
        try:
            print("SubscriptionView called ")
            print(request.data)
            email = request.data["email"]
            customer_id = request.data["customer_id"]
            created = request.data["created"]
            user_data = UserAccount.objects.filter(customer_id=customer_id)
            if len(user_data):
                user_data = user_data[0]
            else:
                user_data = UserAccount.objects.get(email=email)
                user_data.customer_id = customer_id
            created = datetime.fromtimestamp(created)
            # 有効期限は1ヶ月後を設定
            user_data.current_period_end = created + relativedelta(months=1)
            user_data.save()
            
            return Response(
                {'success':'サブスクリプション有効期限の更新に成功しました'},
                status=status.HTTP_200_OK
            )
            
        except:
            return Response(
                {'error':'サブスクリプション有効期限の更新に失敗しました'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            ) 
            

class UserProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        # UserProfileView get ; ユーザー情報取得
        print('# UserProfileView get ; ユーザー情報取得')
        try:
            user = request.user
            # プロフィール
            user_serializer = UserAccountSerializer(user)
            user_profile, created = UserProfile.objects.get_or_create(user=user)
            user_profile = UserProfileSerializer(user_profile)
            print(user_profile.data)
            
            # プロフィール更新の可能な選択肢
            gender = GenderSerializer(Gender.objects.all(), many=True)
            purpose = PurposeSerializer(Purpose.objects.all(), many=True)
            hobby = HobbySerializer(Hobby.objects.all(), many=True)
            occupation = OccupationSerializer(Occupation.objects.all(), many=True)
            annualIncome = AnnualIncomeSerializer(AnnualIncome.objects.all(), many=True)
            prefecture = PrefectureSerializer(Prefecture.objects.all(), many=True)
            city = CitySerializer(City.objects.all(), many=True)


            return Response(
                {
                    'user': user_serializer.data,
                    'user_profile': user_profile.data,
                    'gender': gender.data,
                    'purpose': purpose.data,
                    'hobby': hobby.data,
                    'occupation': occupation.data,
                    'annualIncome': annualIncome.data,
                    'prefecture': prefecture.data,
                    'city': city.data
                },
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error':'ユーザープロフィールの取得に問題が発生しました'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def post(self, request):
        permission_classes = (permissions.IsAuthenticated, )
        
        try:
            
            user = request.user
            data = request.data
            
            print(f"ユーザー: {user}")
            print(f"受信データ: {data}")

            
            user_profile = get_object_or_404(UserProfile, user=data['user'])

            # UserProfileの各フィールドを更新
            user_profile.username = data['username']
            user_profile.gender_id = data['gender']
            user_profile.birthday = data['birthday']
            user_profile.occupation_id = data['occupation']
            user_profile.annual_income_id = data['annual_income']
            user_profile.introduction = data['introduction']
            user_profile.residence_prefecture_id = data['residence_prefecture']
            user_profile.workplace_prefecture_id = data['workplace_prefecture']

            # UserProfileの画像フィールドを更新 (もし画像があれば)
            if data['profile_main_image1']:
                user_profile.profile_main_image1 = data['profile_main_image1']
            if data['profile_image2']:
                user_profile.profile_image2 = data['profile_image2']
            if data['profile_image3']:
                user_profile.profile_image3 = data['profile_image3']

            # UserProfileを保存
            user_profile.save()

            # ManyToManyフィールドの更新
            user_profile.purpose.set(data['purpose'])
            user_profile.hobbies.set(data['hobbies'])
            user_profile.residence_citys.set(data['residence_citys'])
            user_profile.workplace_citys.set(data['workplace_citys'])

            # レスポンスを返す
            return Response(
                {'success': 'ユーザープロフィールの更新に成功しました'},
                status=status.HTTP_200_OK
            )

        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'ユーザープロフィールが見つかりませんでした'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            print(f"エラー: {e}")
            return Response(
                {'error': 'ユーザープロフィールの更新に失敗しました'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


def update_user_profile(user, data):
    user_profile = UserProfile.objects.get(user=user)
    
    user_profile.username = data['username']
    user_profile.birthday = data['birthday']
    user_profile.gender = Gender.objects.get(id=data['gender'])
    user_profile.occupation = Occupation.objects.get(id=data['occupation'])
    user_profile.annual_income = AnnualIncome.objects.get(id=data['annual_income'])
    user_profile.introduction = data['introduction']

    with transaction.atomic():
        user_profile.save()

        user_profile.purpose.set(Purpose.objects.filter(id__in=data['purpose']))
        user_profile.hobbies.set(Hobby.objects.filter(id__in=data['hobbies']))
        user_profile.residence_citys.set(City.objects.filter(id__in=data['cities']))
        user_profile.workplace_citys.set(City.objects.filter(id__in=data['cities']))
        
    return user_profile