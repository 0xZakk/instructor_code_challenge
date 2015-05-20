var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.post('/favorites', function(req, res){
  if(!req.body.name || !req.body.oid){
    return res.send("Error");
  }

  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);

  fs.writeFile('./data.json', JSON.stringify(data));

  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});