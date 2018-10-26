var express = require('express');
var BigNumber = require('bignumber.js');
var app = express();
var jayson = require('jayson');

app.get('/eth_getBlockByNumber/:tag/:bool?', function(req, res){
  var config = {};
  config.localRPCaddress = 'http://127.0.0.1:17545'
  var jaysonclient = jayson.client.http(config.localRPCaddress);
  req.params.tag = '0x'.concat((new BigNumber(req.params.tag)).toString(16));
  jaysonclient.request('eth_getBlockByNumber', [req.params.tag, (req.params.bool && req.params.bool == 'true')], function (error, result) {
    var ret = {};
    ret.jsonrpc = '2.0';
    if (error) {
      ret.error = error;
      ret.result = null;
      ret.success = false;
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
      ret.result = null;
      ret.error = null;
      ret.success = false;
      res.json(ret);
    }
  });
});

app.listen(50508);
