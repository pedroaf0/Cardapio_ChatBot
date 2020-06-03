require('dotenv').config();
const { Autohook } = require('twitter-autohook');
const { ResponseDb } = require('./ResponseDb');

(async () => {
  const webhook = new Autohook();
  await webhook.removeWebhooks();
  webhook.on('event', event => {
    if(typeof(event.direct_message_events) !== 'undefined'){
        if(event.direct_message_events[0].message_create.sender_id != process.env.TWITTER_ID){
            const id = event.direct_message_events[0].message_create.sender_id;
            const name = event.users[event.direct_message_events[0].message_create.sender_id].screen_name;
            const ReceivedMessage = event.direct_message_events[0].message_create.message_data.text;

            const Response = ResponseDb[ReceivedMessage.split(" ")[0]]
            if (Response){
              Response(id, ReceivedMessage, name);
            }else{
              ResponseDb['default'](id)
            }
        }
    }
  });
  await webhook.start();
  await webhook.subscribe({oauth_token:process.env.TWITTER_ACCESS_TOKEN, oauth_token_secret:process.env.TWITTER_ACCESS_TOKEN_SECRET });
})();