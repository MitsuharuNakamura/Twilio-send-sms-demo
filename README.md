# Functions&Assetsを使ってログインからSMS送信までの実装  
## 説明  
このコードは、WebページやSMSの送信機能をすべてTwilio Functions&Assetsを使って実装することを目的として作られています。
セキュリティ強度を高めるために、X-Twilio-Signatureを使ったり、Basic認証を構築したりしています。　　

## 事前準備  
1. .envファイルに必要な値をすべて設定してください
   1. ACCOUNT_SID : 管理コーンソールかアカウントSIDを入力してください(例：ACxxxxxxxxxxx)
   2. AUTH_TOKEN : 管理コンソールからAuthTokenを入力してください。
   3. LOGIN_USERNAME : 任意の値
   4. LOGIN_PASSWORD : 任意の値
   5. DOMAIN_NAME : このコードをデプロイした後に取得できるFunctinosのDomain（例：login-2211-dev.twil.io）
   6. TWILIO_PHONE_NUMBER : コンソールで購入済のUS電話番号または、英数字10桁程度の文字列
   7. SMS_SEND_AUTH_CODE : 任意の値

## デプロイ手順  
cd login
twilio serverless:deploy

## 実行手順
1. https://<functionsのDomain>/login.html にアクセスする
2. 認証を実行する
   1. ID : envファイルに記載したID
   2. パスワード : envファイルに記載したパスワード
3. SMSの送信画面がでてくるので下記の項目を入力
   1. 電話番号: 送信先の電話番号を入力
   2. メッセージ: 送信したい文章を入力
   3. 送信認証 : envの「SMS_SEND_AUTH_CODE」に設定した値を入力
4. 送信ボタンを押す