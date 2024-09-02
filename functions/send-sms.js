exports.handler = function(context, event, callback) {
    const client = context.getTwilioClient();
    const to = event.to;
    const from = context.TWILIO_PHONE_NUMBER; // Twilioの電話番号
    const body = event.body;
    const inputCode = event.code;
    const correctCode = context.SMS_SEND_AUTH_CODE; // 環境変数に設定された認証コード

    const response = new Twilio.Response();
    response.appendHeader('Content-Type', 'application/json');

    if (inputCode !== correctCode) {
        response.setBody({ status: 'failure', error: 'Invalid authentication code' });
        response.setStatusCode(401);
        callback(null, response);
        return;
    }

    client.messages
        .create({
            to: to,
            from: from,
            body: body
        })
        .then(message => {
            response.setBody({ status: 'success', sid: message.sid });
            callback(null, response);
        })
        .catch(error => {
            response.setBody({ status: 'failure', error: error.message });
            callback(null, response);
        });
};