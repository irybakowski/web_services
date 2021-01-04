const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
var jwt = require('jsonwebtoken');

let yup = require('yup');

const app = express();
const port = 3000;


const LOGIN = "test";
const PASSWORD = "12341234";
const PRIVATE_KEY = "someSecretKey";


app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/info', (req, res) => {
  res.status(200);
  res.json({
    'author' : 23103
  });
})

let schema = yup.object().shape({
  name: yup.string().trim().max(10).matches(/^[a-zA-Z]+$/).required()
})

app.get('/hello/:name', (req, res) => {
  schema.isValid(req.params).then(function (valid) {
    if (valid) {
      res.status(200);
      res.send('Hello ' + req.params.name);
    } else {
      res.status(400);
      res.send("Error 400 Name is not valid");
    }
  })
})

let tab = [];

app.post('/store', function (req, res) {
  tab.push(req.body.input)
  res.status(201)
  res.json({
    stored_data: tab
  })
})

app.post('/login', function (req, res) {
  console.log(req.body.login);
  console.log(req.body.password);
  if (req.body.login != LOGIN | req.body.password != PASSWORD) {
    res.status(401);
    res.send("Invalid login data");
  } else {
    var token = jwt.sign(LOGIN, PRIVATE_KEY);
    res.send(token)
  }
});


const runServer = (port) => {
  app.listen(port, () => {
    console.log('REST server is listening at http://localhost:${port}');
  });
}

module.exports = {
  runServer,
  app
}