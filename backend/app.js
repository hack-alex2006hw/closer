var express = require('express');
var app = express();
var dotenv = require('dotenv').load();
var bodyParser = require('body-parser');

/* SMS testing */

var s = require(__dirname + "/sms.js");


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/sms',function(req,res){
  res.sendfile("sms.html");
});

app.post('/sms',function(req,res){
  var phoneNumber= req.body.phone || process.env.phoneNumber;
  var smsMessage= req.body.message || process.env.smsMessage;
  console.log(req.body);
  console.log("User phone : "+phoneNumber+", message : "+smsMessage);
  s.sendMessage(phoneNumber, smsMessage);
  res.end("yes");
});


app.listen(process.env.PORT || 3000);
