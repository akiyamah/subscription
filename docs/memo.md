pip install --upgrade pip 
pip install Django 
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install PyJWT
pip install python-dateutil 

## settings.py設定変更
LANGUAGE_CODE = 'ja'
TIME_ZONE = 'Asia/Tokyo'

## 動作確認
python manage.py migrate
python manage.py runserver
Starting development server at http://127.0.0.1:8000/



## アプリケーション作成
python manage.py startapp app
python manage.py startapp accounts

## settings.py設定変更
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # 追加
    'rest_framework',
    'accounts',
    'app',
]

## 認証設定
### 　JWT認証とは？
JWT(JSON Web Token)
JSON:JavaScriptの構造を持ったデータフォーマット
Token:ユーザーを識別するための認証情報
JWTは、JavaScriptのデータフォーマットの認証情報
JWT認証は、署名が含まれている,改ざんを検知することができる

### インストール
pip install djangorestframework-simplejwt
pip install PyJWT

### settings.py設定変更
```
# 追加設定
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
    'rest_framework.permissions. IsAuthenticated',
    ],
    'DEFAULT AUTHENTICATION CLASSES': [
    'rest framework simplejwt.authentication.',
    ]
}

# 追加設定
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=3),
    'ROTATE_REFRESH _TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'AUTH _HEADER_TYPES': ('Bearer', ),
    'AUTH _TOKEN _CLASSES': ('rest_framework_simplejwt.tokens.AccessToken', )
}

AUTH_USER_MODEL = 'accounts.UserAccount'
```

### モデル作成
acounts.model
```
UserManager,
UserAccount
```
acounts.admin
```
from django.contrib import admin 
from django.contrib.auth import get_user_model


User = get_user_model()
admin.site.register(User)
```

### スーパーユーザー作成
```
(venv) akiyamah@akiyamacbookpro subscription % python manage.py createsuperuser
メールアドレス: akiyamah006@gmail.com                                                        
名前: akiyamah006
Password: 
Password (again): 
Superuser created successfully.
(venv) akiyamah@akiyamacbookpro subscription % 
```