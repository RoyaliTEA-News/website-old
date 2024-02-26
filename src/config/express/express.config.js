import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import api from '../../api'
import web from '../../web'
import cdn from '../../cdn'

export default (apiLimiter) => {
  const app = express()
  const port = process.env.PORT ?? isNaN(process.env.PORT) ? 3000 : process.env.PORT

  //app.use(helmet())
  app.use(cors())
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.set('trust proxy')

  app.use('/assets', express.static(`${process.cwd()}/src/web/assets`))
  app.use('/api', apiLimiter, api)
  app.use('/cdn', cdn)
  app.use('/', web)

  app.use((error, req, res, next) => {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'An error has occurred!'
    })
  })

  return new Promise(resolve => {
    app.listen(port, () => {
      resolve(port)
    })
  })
}
