import configureRoyaliTEA from './config'

configureRoyaliTEA()
  .then(port => {
    console.log(`RoyaliTEA API started on port ${port}!`)
  })
