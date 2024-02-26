import configureExpress from './express.config'
import configureRateLimit from './rateLimit.config'

export default () =>
  configureExpress(configureRateLimit.main())
