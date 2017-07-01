var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

function s(msg){
  currentSession.send(msg);
}

function monitor(trigger, response){
  if(String(currentSession.message.text).toLowerCase().search(trigger) != -1){
    s(response);
    isSent = 0;
  }

}

var currentSession = null;
var isSent = null;

var bot = new builder.UniversalBot(connector, function (session) {
  currentSession = session;
  isSent = 1;
  monitor("theo","toto");
  monitor("kick","Justice rains from above");
  monitor("oppression", "Theo est un dictateur");
  monitor("ping","pong");
  monitor("le pire", "@160320918 (Vincent)");
  if(isSent == 1){
    // s("You said "+ session.message.text)
  }
});

bot.on('conversationUpdate', function (update) {
    if (update.membersAdded != null) {
      for (var newMember in update.membersAdded) {
        s("Bonjour "+ newMember.name + " !")
      }
      if (update.membersRemoved != null) {
        for (var newMember in update.membersRemoved) {
          s("Byebye "+ newMember.name + " ! À la prochaine !")
        }

    }
});
