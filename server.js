const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes/router.js')
var cors = require('cors')
const port = 3000
const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use('/',router)

app.listen(port, () => {
    console.log('API executando')
})
