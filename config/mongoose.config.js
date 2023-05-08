const mongoose = require('mongoose')
require('dotenv').config()

mongoose
  .connect(
    'mongodb+srv://muhammad:muhammad@cluster0.pjbug9v.mongodb.net/session?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log(`Connected to DB Successfully`)
  })
  .catch((err) => {
    console.log({ message: 'error connecting to database', error: err })
  })
