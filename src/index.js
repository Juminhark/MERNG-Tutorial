import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {
  DB_URL,
  APP_PORT, IN_PROD,
  SESS_NAME, SESS_SECRET, SESS_LIFETIME,
  REDIS_HOST, REDIS_PORT, REDIS_PASSWORD
} from './config'
import mongoose from 'mongoose'

(async () => {
  try {
    await mongoose.connect(`${DB_URL}`, { useNewUrlParser: true })

    const app = express()

    app.disable('x-powered-by')

    const RedisStore = connectRedis(session)

    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASSWORD,
      logErrors: true
    })

    app.use(session({
      store,
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
      }
    }))

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PROD,
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app })

    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()
