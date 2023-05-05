# ファイル: backend/accounts/signals.py
# ルート:backend/mysite
from django.apps import AppConfig

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User


'''
from .models import (
    UserAccount, UserManager, Gender, Purpose,
    Occupation, Hobby, AnnualIncome, Area,
    Prefecture, City, UserProfile
)

'''
