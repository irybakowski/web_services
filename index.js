const yup = require('yup');
const user_data = require('./consts');
const parsers = require('./parsers');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');

const { runServer, app } = require('./server');

runServer(3000);

var TOKEN = null;

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
        res.send('Hello ' + req.params.name + "!");
      } else {
        res.status(400);
        res.send("Name is not valid");
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
    if (req.body.login != user_data.LOGIN | req.body.password != user_data.PASSWORD) {
      res.status(401);
      res.send("Invalid login data");
    } else {
      TOKEN = jwt.sign(user_data.LOGIN, user_data.PRIVATE_KEY);
      res.send(TOKEN)
    }
  });
  
  app.get('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,user_data.PRIVATE_KEY,(err,authLogin)=>{
        if(err) {
          res.status(401);
          res.send("Invalid Token");
        }   
        else{
            res.json({
                login:authLogin
            })     
        }
    })
  });
  
  
  app.post("/parse", function (req, res) {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      let path = files.toParse.path;
      fs.readFile(path, "utf8", (err, data) => {
        const values = data.toString().trim().split(";");
        const result = {};
        values.forEach((item) => {
          const parsedItem = item.replace(":", ";");
          const [key, value] = parsedItem.split(";");
          const parsedValue = Number(value);
          if (!Number.isNaN(parsedValue)) {
              result[key] = parsedValue;
          } else {
              const subValues = value.split(",");
              result[key] = {};
              subValues.forEach((subItem) => {
                  const [subKey, subValue] = subItem.split(":");
                  result[key][subKey] = Number(subValue);
              });
            }
        });
        return res.status(200)
        .json({
          result
        });
      });
    });
  });
  
  function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
      res.status(401);
      res.send("Invalid Token");
    }
  }