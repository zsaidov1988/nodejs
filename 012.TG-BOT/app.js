TELEGRAM_BOT_TOKEN = "2131705591:AAGS7wmOdbMUTo7rY3AoA2uR9-aYTPn5R2Y";
const TeleBot = require('telebot');
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);

const CronJob = require('cron').CronJob;
const job = new CronJob('0/5 * * * * *', function() { // har 5 soniyada shu ish bajariladi
  console.log('You will see this message every 5 second');
  chatIds.forEach((chatId) => {
    bot.sendMessage(chatId, "salom");
  })
}, null, true);


const chatIds = [];

bot.on('text', (msg) => msg.reply.text("Kelgan xabar: " + msg.text));

bot.on(['/start'], (msg) => {
  let chatId = msg.chat.id;
  if (!chatIds.includes(chatId)) {
    chatIds.push(chatId);
    msg.reply.text("Boshladik!");
    job.start();
  }
})

bot.on(['/stop'], (msg) => {
  let chatId = msg.chat.id;
  chatIds.pop(chatId);
})

bot.start();