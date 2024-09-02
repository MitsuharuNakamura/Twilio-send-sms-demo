//このFunctionsは使われることはないです。機能はlogin.jsにすべてマージされました。
const crypto = require('crypto');

exports.handler = function(context, event, callback) {
    const url = `https://${context.DOMAIN_NAME}/top.html`;
    const authToken = context.AUTH_TOKEN; // TwilioのAuth Tokenを使用
    console.log('url = ' + url)
    console.log('username = ' + username)
    const signature = crypto.createHmac('sha1', authToken)
                            .update(url)
                            .digest('base64');

    const response = new Twilio.Response();
    response.appendHeader('Content-Type', 'application/json');
    response.setBody({ signature: signature });
    callback(null, response);
};