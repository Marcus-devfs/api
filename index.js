require('dotenv').config()
const express = require('express')
const routes = require('./src/index')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/', routes)

app.get('/teste', (req, res) => {
    res.send({ msg: 'entrou' })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL).then(res => {
   console.log('Connected to DB')
}).catch(err => {
   console.log('ERRO:', err.errors)
})

mongoose.Promise = global.Promise

app.listen(port, () => {
   console.log(`API on port ${port}`)
})