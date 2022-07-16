const mongoose = require('mongoose')

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Database Connected!')
      })
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = connectDatabase
