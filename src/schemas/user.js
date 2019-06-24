import Joi from 'joi'

const email = Joi.string().email().required().label('Email')

const username = Joi.string().alphanum().min(4).max(30).required().label('Username')

const name = Joi.string().max(254).required().label('Name')

const password = Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/)
  .label('Password').options({
    language: {
      string: {
        regex: {
          base: 'must have at least one letter, one number and one special character, minimum eight characters.'
        }
      }
    }
  })

export const signUp = Joi.object().keys({
  email, username, name, password
})

export const signIn = Joi.object().keys({
  email, password
})
