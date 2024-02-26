import configureExpress from './express'
import configureMongoose from './mongoose'

export default () =>
  import('dotenv/config')
    .then(configureMongoose)
    .then(configureExpress)
