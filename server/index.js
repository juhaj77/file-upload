const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileRouter = require('./routes/fileRouter')
require('express-async-errors')
require('dotenv').config()
const cors = require('cors')

mongoose.connect(process.env.MONGODB_URL)


const errorHandling = (err, req, res, next) => {
    res.status(500).json({
      msg: err.message,
      success: false,
    })
  }

console.log(process.env.NODE_ENV)
app.use(cors())
app.use(bodyParser.json())
app.use('/api',fileRouter)

app.use(errorHandling)
app.listen(process.env.PORT, function() {
  console.log(`App running on port ${process.env.PORT}`)
})