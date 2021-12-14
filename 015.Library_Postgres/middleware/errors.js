const winston = require('winston'); // Xatolarni log ga yozish
require('winston-mongodb'); // Xatolarni mongoga yozish uchun modul

winston.add(new winston.transports.Console());
winston.add(new winston.transports.File({filename: 'logs.log', level: "error"})); // levelni filtrlash mumkin
winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/library-logs'}));

// Tutilmagan xatolarni aniqlash uchun
process.on('uncaughtException', ex => {
  winston.error(ex.message, ex);
  process.exit(1);
})
// Tutilmagan xatolarni aniqlash uchun
process.on('unhandledRejection', ex => {
  winston.error(ex.message, ex);
  process.exit(1);
})

module.exports = function(err, req, res, next) {
  winston.error(err.message, err);
  res.status(500).send("Serverda kutilmagan xato ro'y berdi!")
}