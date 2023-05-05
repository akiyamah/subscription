# backend/accounts/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Gender, Purpose, Occupation, Hobby, AnnualIncome, Prefecture, City, UserAccount, UserProfile


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'name', 'email', 'customer_id', 'current_period_end')
        

class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = ('id', 'name')


class PurposeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purpose
        fields = ('id', 'name')

class OccupationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = ('id', 'name')

class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ('id', 'name')

class AnnualIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnualIncome
        fields = ('id', 'name')

class PrefectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prefecture
        fields = ('id', 'name')

class CitySerializer(serializers.ModelSerializer):
    prefecture_id = serializers.IntegerField(source='prefecture.id')
    class Meta:
        model = City
        fields = ('id', 'name', 'prefecture_id')


class UserProfileSerializer(serializers.ModelSerializer):
    gender = GenderSerializer()
    occupation = OccupationSerializer()
    annual_income = AnnualIncomeSerializer()
    purpose = PurposeSerializer(many=True)
    hobbies = HobbySerializer(many=True)
    residence_prefecture = PrefectureSerializer()
    residence_citys = CitySerializer(many=True)
    workplace_prefecture = PrefectureSerializer()
    workplace_citys = CitySerializer(many=True)
    class Meta:
        model = UserProfile
        fields = (
            'user',  
            'username', 
            'birthday', 
            'age', 
            'gender', 
            'occupation', 
            'annual_income', 
            'purpose', 
            'hobbies', 
            'residence_prefecture', 
            'residence_citys', 
            'workplace_prefecture', 
            'workplace_citys', 
            'introduction', 
            'profile_main_image1', 
            'profile_image2', 
            'profile_image3', 
        )