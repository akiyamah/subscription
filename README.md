# subscription
サブスクリプションのサービス作成

# 目的
* モダンな技術の学習
* アプリ作成の経験
* フロントエンド、バックエンドのAPIを使用したした疎結合アプリ開発の経験

# 技術スタック
## フロントエンド
* 言語: javascript
* フレームワーク: Next.js
* アプリケーション状態管理: Redux
* スタイル: TailwindCSS  

## バックエンド
* 言語: Python
* フレームワーク: DRF (Django rest framework)
* 認証: JWT (JSON Web Token認証)
* DB: PostgreSQL (開発はsqlite)

## その他
* 決済機能: Stripe  
* 自然言語処理: ChatGPT
* OS: Linux(Ubuntu)

# 環境構築
## バックエンド
### 仮想環境作成
```
mkdir backend
cd backend
python -m venv venv 
source venv/bin/activate
```

### ライブラリ インストール 
```
pip install --upgrade pip 
pip install Django 
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install PyJWT
pip install python-dateutil 
```
#### 依存ライブラリ
**Django**:Pythonの高レベルWebアプリケーションフレームワークです。MVC（Model-View-Controller）アーキテクチャを基に設計されており、データベース操作、URLルーティング、テンプレートエンジンなどの機能が統合されています。今回はバックエンドとして使用するため、テンプレート(Controller)は使用しません。

**djangorestframework**: Djangoを使って簡単にRESTful APIを構築するための強力なライブラリです。シリアライゼーション、認証、ページネーションなどの機能を提供しています。

**djangorestframework-simplejwt**: Django RESTフレームワークを使用したアプリケーションでJSON Web Token（JWT）認証を実装するためのライブラリです。

**PyJWT**: PythonでJSON Web Token（JWT）をエンコード、デコード、検証するためのライブラリです。JWTは認証や承認に使用されるコンパクトで安全なトークンです。

**python-dateutil**: Pythonで日付と時刻を操作するための拡張ライブラリです。日付の解析、加算・減算、書式設定などの機能が提供されており、タイムゾーンのサポートも含まれています。

### プロジェクト作成
```
python manage.py startproject mysite
```

### アプリケーション作成
```
python manage.py startapp accounts
python manage.py startapp app
```

### 動作確認
```
python manage.py runserver
```
http://localhost:8000/ へアクセス。


## フロントエンド
### Next.jsの実行環境 (node, npm必須)
```
node -v
npm -v
```

### Next.jsインストール
```
npx create-next-app . --ser-npm
```

### 動作確認
```
npm run dev
```
http://localhost:3000へアクセス。

### TailwindCSS導入
公式ドキュメント: https://tailwindcss.com/docs/installation
```
npm install -D tailwindcss
npx tailwindcss init
```

### 状態管理,その他ライブラリインストール
```
npm install cookie 
npm install date-fns
npm install micro
npm install micro-micrs 
npm install react-loader-spinner
npm install react-redux
npm install redux
npm install redux-devtools-extension

date-fns micro micro-micrs react-loader-spinner react-redux redux redux-devtools-extension redux-thunk stripe
```

Next.jsはReactベースのWebアプリケーションフレームワーク。  
アプリケーションの状態管理にはReduxを使用する。  
TailwindCSSはユーティリティクラスを活用したCSSフレームワーク。