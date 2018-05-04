var express = require('express');
var appData = require('./data.json');
var app = express();

// 获取数据
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

app.get('/api/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

app.get('/api/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

app.get('/api/ratings', function(req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

var server = app.listen(8900, 'localhost', function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
})