import rateLimit from 'express-rate-limit'

export default {
  main: () =>
    rateLimit({
      windowMs: 60 * 1000,
      max: 60,
      message: 'You are being rate limited! Please try again later.'
    }),
  auth: () =>
    rateLimit({
      windowMs: 60 * 1000,
      max: 60,
      message: 'You are being rate limited! Please try again later.'
    })
}
