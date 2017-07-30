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

function returnTime(){
  var d = new Date()
  let peopleRepo = new Map()
  peopleRepo.set("Chicago",-5);
  peopleRepo.set("Paris",+2);
  peopleRepo.set("Ho Chi Minh Ville",+7);


  utcHour = d.getUTCHours()
  utcMin = d.getUTCMinutes()


  var res = "Today, " + d.getDate().toString() + "/" + (d.getMonth()+1).toString() + "\n\n\n\n"

  for (var [key, value] of peopleRepo) {
    dayOffset = ""
    hours = utcHour + value

    if(hours < 0 ){
      hours += 24
      dayOffset = " (J-1) "
    }else if (hours > 24){
      hours -= 24
      dayOffset = " (J+1) "
    }else{
      // s("Today, " + d.getDate().toString() + "/" + (d.getMonth()+1).toString())
    }
    minutes = utcMin
    res += String(key + " time is "+ dayOffset + ("0" + hours.toString()).slice(-2) + "h" + ("0" + minutes.toString()).slice(-2) + "\n\n \n\n")
  }
  s(res)
}

var currentSession = null;
var isSent = null;

var bot = new builder.UniversalBot(connector, function (session) {
  currentSession = session;
  isSent = 1;
  monitor("bonjour","toto");
  monitor("/time",returnTime())

  if(isSent == 1){
    // s("You said "+ session.message.text)
  }
});

bot.on('conversationUpdate', function (update) {
    if (update.membersAdded != null) {
      for (var newMember in update.membersAdded) {
        s("Bonjour "+ newMember.name + " !");
      }
    }
    if (update.membersRemoved != null) {
      for (var newMember in update.membersRemoved) {
        s("Byebye "+ newMember.name + " ! À la prochaine !");
      }
    }
}) ;
