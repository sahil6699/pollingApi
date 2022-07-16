require('dotenv').config()
const express = require('express')
const app = express()
const connectDatabase = require('./config/db')
const PORT = process.env.PORT || 8000

// Connecting to the database
connectDatabase()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', (_, res) => {
  res.send('Polling API Home')
})
// Questions Route
app.use('/questions', require('./routes/question.route'))
// Options Route
app.use('/options', require('./routes/option.route'))

// Listen to the port
app.listen(PORT, () => {
  console.log(`App is listening at port: ${PORT}`)
})
