const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

const runServer = (port) => {
  app.listen(port, () => {
    console.log('REST server is listening at http://localhost:${port}');
  });
}

module.exports = {
  runServer,
  app
}