
if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const router = require('./routes/index')


app.use(cors())
app.use(require('morgan')('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.use(errorHandler)

app.listen(port, console.log(`running server on port ${port}`))