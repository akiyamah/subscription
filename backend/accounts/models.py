from django.db import models
from django. contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email')
        
        print("# backend/accounts/models.py UserManager create_user ")
        email = self.normalize_email(email)
        email = email.lower()
        
        user = self.model(
            email=email,
            name=name
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, name, password=None): 
        print("# backend/accounts/models.py UserManager create_superuser ")
        user = self.create_user(email, name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField("メールアドレス", max_length=255, unique=True)
    name = models.CharField("名前", max_length=255)
    
    customer_id = models.CharField("顧客ID", max_length=255, blank=True, null=True) 
    current_period_end = models.DateTimeField("有効期限", blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    def str (self):
        return self.email


class Gender(models.Model):
    name = models.CharField(max_length=30)
    
    def __str__(self):
        return self.name


class Purpose(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class Occupation(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class Hobby(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class AnnualIncome(models.Model):
    name = models.CharField(max_length=30)
    
    def __str__(self):
        return self.name


class Prefecture(models.Model):
    name = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=50)
    prefecture = models.ForeignKey(Prefecture, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name



class UserProfile(models.Model):
    
    def get_gender_default():
        return Gender.objects.get_or_create(name='その他')[0].id

    def get_occupation_default():
        return Occupation.objects.get_or_create(name='その他')[0].id

    def get_annual_income_default():
        return AnnualIncome.objects.get_or_create(name='その他')[0].id

    def get_prefecture_default():
        return Prefecture.objects.get_or_create(name='その他')[0].id
    
    def user_directory_path(instance, filename):
        return f"user_profile/{instance.user.id}/{filename}"
    
    # アプリ利用のためのユーザー詳細情報
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    username = models.CharField(max_length=30, unique=True)
    birthday = models.DateField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    gender = models.ForeignKey(Gender, blank=True, default=get_gender_default, on_delete=models.SET_NULL, null=True)
    occupation = models.ForeignKey(Occupation, blank=True, default=get_occupation_default, on_delete=models.SET_NULL, null=True)
    annual_income = models.ForeignKey(AnnualIncome, blank=True, default=get_annual_income_default, on_delete=models.SET_NULL, null=True)
    purpose = models.ManyToManyField(Purpose, blank=True)
    hobbies = models.ManyToManyField(Hobby, blank=True)
    residence_prefecture = models.ForeignKey(Prefecture, blank=True, default=get_prefecture_default, on_delete=models.SET_NULL, related_name="residence_users", null=True)
    residence_citys = models.ManyToManyField(City, blank=True, related_name="residence_users")
    workplace_prefecture = models.ForeignKey(Prefecture, blank=True, default=get_prefecture_default, on_delete=models.SET_NULL, related_name="workplace_users", null=True)
    workplace_citys = models.ManyToManyField(City, blank=True, related_name="workplace_users")
    introduction = models.CharField(max_length=300, null=True, default="こんにちわ", blank=True)
    profile_main_image1 = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    profile_image2 = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    profile_image3 = models.ImageField(upload_to=user_directory_path, null=True, blank=True)

    
    def __str__(self):
        return self.username


