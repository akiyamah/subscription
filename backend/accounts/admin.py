from django.contrib import admin 
from django.contrib.auth import get_user_model
from .models import Gender, Purpose, Occupation, Hobby, AnnualIncome, Prefecture, City, UserAccount, UserProfile


@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'name','customer_id', 'current_period_end', 'is_active', 'is_staff')


@admin.register(Gender)
class GenderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)

@admin.register(Purpose)
class PurposeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)

@admin.register(Occupation)
class OccupationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)

@admin.register(Hobby)
class HobbyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)

@admin.register(AnnualIncome)
class AnnualIncomeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)

@admin.register(Prefecture)
class PrefectureAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'prefecture',)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    # 既存のコードを修正
    list_display = ('id', 'user', 'username', 'birthday', 'age', 'gender', 'occupation', 'annual_income', 'display_purpose', 'display_hobbies')

    def display_purpose(self, obj):
        return ", ".join([purpose.name for purpose in obj.purpose.all()])
    display_purpose.short_description = 'Purpose'

    def display_hobbies(self, obj):
        return ", ".join([hobby.name for hobby in obj.hobbies.all()])
    display_hobbies.short_description = 'Hobbies'

