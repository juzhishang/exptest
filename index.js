var express = require('express')
var app = express()

app.get('/', function(req, res) {
  res.send('hello world!')
}).listen(3000, function() {
  console.log('port at 3000')
})
