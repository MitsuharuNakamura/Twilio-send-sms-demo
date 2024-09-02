// functions/login.js
const crypto = require('crypto');

exports.handler = function(context, event, callback) {
    const response = new Twilio.Response();
  
    // CORS設定
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Content-Type', 'application/json');
  
    // X-Twilio-Singnatureを生成する
    const url = `https://${context.DOMAIN_NAME}/top.html`;
    const authToken = context.AUTH_TOKEN; // TwilioのAuth Tokenを使用
    const signature = crypto.createHmac('sha1', authToken)
                            .update(url)
                            .digest('base64');


    // 環境変数からユーザー名とパスワードを取得
    const validUsername = context.LOGIN_USERNAME;
    const validPassword = context.LOGIN_PASSWORD;
  
    // ユーザー名とパスワードを検証
    const username = event.username;
    const password = event.password;
  
    if (username === validUsername && password === validPassword) {
      response.setBody({ message: 'Login successful', status: 'success', signature: signature});
      response.setStatusCode(200);
    } else {
      response.setBody({ message: 'Invalid username or password', status: 'fail', signature: ''});
      response.setStatusCode(401);
    }
  
    return callback(null, response);
  };
  