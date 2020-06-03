require('dotenv').config();
var T = new require('twit')({
    consumer_key:         process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
exports.SendMessage = function SendMessage(id, text){
console.log('on SendMessage')
console.log({id, text})
    T.post('direct_messages/events/new', {
      "event": {
        "type": "message_create",
        "message_create": {
          "target": {
            "recipient_id": id
          },
          "message_data": {
            "text": text,
          }
        }
      }
   }, (error, data, response) => { if(error) console.log(error) });
}
exports.OnTyping =  function OnTyping(id){
   T.post('direct_messages/indicate_typing', {recipient_id: id}, error => {
    if(error)console.log(error);
    console.log('on Typing')
  });
}