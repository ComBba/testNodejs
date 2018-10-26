var express = require('express');
var BigNumber = require('bignumber.js');
var app = express();
var jayson = require('jayson');

var ret = {};
ret.jsonrpc = '2.0';
ret.result = null;
ret.success = false;
ret.error = null;

app.get('/eth_getBlockByHash/:tag/:bool?', function(req, res){
  var config = {};
  config.localRPCaddress = 'http://127.0.0.1:17545'
  var jaysonclient = jayson.client.http(config.localRPCaddress);
  jaysonclient.request('eth_getBlockByHash', [req.params.tag, (req.params.bool && req.params.bool == 'true' ? true : false)], function (error, result) {
    if (error) {
      ret.error = error;
      res.json(ret);
    } else if (result) {
      if (result.error) {
        result.success = false;
        result.result = null;
      } else {
        result.success = true;
      }
      res.json(result);
    } else {
      res.json(ret);
    }
  });
});

app.listen(50508);
