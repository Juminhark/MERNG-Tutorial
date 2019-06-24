require('dotenv').config()

export const {
  DB_URL,

  APP_PORT = 4000,
  NODE_ENV = 'develoment',

  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret!',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
} = process.env

export const IN_PROD = NODE_ENV === 'production'
