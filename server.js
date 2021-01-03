const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello World app.js!')
})

app.get('/info', (req, res) => {
  res.status(200);
  res.json({
    'author' : 23103
  });
})

const runServer = (port) => {
  app.listen(port, () => {
    console.log('REST server is listening at http://localhost:${port}');
  });
}

module.exports = {
  runServer,
  app
}