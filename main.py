# Specifics for telegram
from telegram.ext import Updater
from telegram.ext import MessageHandler, Filters
from telegram.ext import CommandHandler
import logging
# others
import datetime


updater = Updater(token=)
dispatcher = updater.dispatcher

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',level=logging.INFO)

def start(bot, update):
    bot.send_message(chat_id=update.message.chat_id, text="I'm a bot, please talk to me!")

def echo(bot, update):
    bot.send_message(chat_id=update.message.chat_id, text=str(len(update.message.text)))

def time(bot, update):
    bot.send_message(chat_id=update.message.chat_id,text=datetime.datetime.now().isoformat(timespec='minutes'))


# start reading messages
updater.start_polling()

echo_handler = MessageHandler(Filters.text, echo)
dispatcher.add_handler(echo_handler)

start_handler = CommandHandler('start', start)
dispatcher.add_handler(start_handler)
time_handler = CommandHandler('time', time)
dispatcher.add_handler(time_handler)
