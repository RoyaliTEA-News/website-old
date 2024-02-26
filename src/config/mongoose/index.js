import mongoose from 'mongoose'

export default () =>
  mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
