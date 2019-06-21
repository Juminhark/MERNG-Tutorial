export const {
  APP_PORT = 4000,
  NODE_ENV = 'develoment',
  DB_URL = 'mongodb+srv://admin:admin@test-ljfri.mongodb.net/test?retryWrites=true&w=majority'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
