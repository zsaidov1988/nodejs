require('dotenv').config();

module.exports = {
  PORT: process.env.PORT_NUMBER,
  ADDRESS_MONGO: process.env.ADDRES_MONGO,
  SECRET_CODE: process.env.SECRET_CODE,
  USER_POSTGRES: process.env.USER_POSTGRES,
  PASSWORD_POSTGRESS: process.env.PASSWORD_POSTGRESS,
  HOST_POSTGRES: process.env.HOST_POSTGRES,
  PORT_POSTGRES: process.env.PORT_POSTGRES,
  DATABASE_POSTGRES: process.env.DATABASE_POSTGRES
}