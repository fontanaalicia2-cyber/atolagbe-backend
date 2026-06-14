const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors({
  origin: [
    'https://atolagbeenergysolution.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ]
}))
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/projects', require('./routes/projects'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')))
  .catch(err => console.error(err))