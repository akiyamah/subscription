# Generated by Django 4.1.7 on 2023-05-04 21:29

import accounts.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='メールアドレス')),
                ('name', models.CharField(max_length=255, verbose_name='名前')),
                ('customer_id', models.CharField(blank=True, max_length=255, null=True, verbose_name='顧客ID')),
                ('current_period_end', models.DateTimeField(blank=True, null=True, verbose_name='有効期限')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AnnualIncome',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Gender',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Hobby',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Occupation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Prefecture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Purpose',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30, unique=True)),
                ('birthday', models.DateField(blank=True, null=True)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('introduction', models.CharField(blank=True, default='こんにちわ', max_length=300, null=True)),
                ('profile_main_image1', models.ImageField(blank=True, null=True, upload_to=accounts.models.UserProfile.user_directory_path)),
                ('profile_image2', models.ImageField(blank=True, null=True, upload_to=accounts.models.UserProfile.user_directory_path)),
                ('profile_image3', models.ImageField(blank=True, null=True, upload_to=accounts.models.UserProfile.user_directory_path)),
                ('annual_income', models.ForeignKey(blank=True, default=accounts.models.UserProfile.get_annual_income_default, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.annualincome')),
                ('gender', models.ForeignKey(blank=True, default=accounts.models.UserProfile.get_gender_default, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.gender')),
                ('hobbies', models.ManyToManyField(blank=True, to='accounts.hobby')),
                ('occupation', models.ForeignKey(blank=True, default=accounts.models.UserProfile.get_occupation_default, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.occupation')),
                ('purpose', models.ManyToManyField(blank=True, to='accounts.purpose')),
                ('residence_citys', models.ManyToManyField(blank=True, related_name='residence_users', to='accounts.city')),
                ('residence_prefecture', models.ForeignKey(blank=True, default=accounts.models.UserProfile.get_prefecture_default, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='residence_users', to='accounts.prefecture')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('workplace_citys', models.ManyToManyField(blank=True, related_name='workplace_users', to='accounts.city')),
                ('workplace_prefecture', models.ForeignKey(blank=True, default=accounts.models.UserProfile.get_prefecture_default, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='workplace_users', to='accounts.prefecture')),
            ],
        ),
        migrations.AddField(
            model_name='city',
            name='prefecture',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.prefecture'),
        ),
    ]
