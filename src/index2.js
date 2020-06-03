const crypto = require('crypto');
const { ResponseDb } = require('./ResponseDb');
const http = require('http');
const url = require('url');
const { PORT = 3000 } = process.env;

require('dotenv').config();
const { TWITTER_CONSUMER_SECRET } = process.env;



const validateWebhook = (token, auth) => {
  const responseToken = crypto.createHmac('sha256', auth).update(token).digest('base64');
  return {response_token: `sha256=${responseToken}`};
}

function event_(event) {
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
};



server = http.createServer((req, res) => {
  const route = url.parse(req.url, true);

  if (!route.pathname) {
    return;
  }

  if (route.query.crc_token) {
    const crc = validateWebhook(route.query.crc_token, TWITTER_CONSUMER_SECRET);
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify(crc));
  }

  if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      event_(body, req)
      res.writeHead(200);
      res.end();
    });
  }
}).listen(PORT);