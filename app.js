// https://www.npmjs.com/package/helmet

const express = require('express')
const helmet = require("helmet")
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello byatch!')
})

app.post('/soap', function (req, res) {
  res.send('soap')
})

app.post('/rest', function (req, res) {
  res.send('rest')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})