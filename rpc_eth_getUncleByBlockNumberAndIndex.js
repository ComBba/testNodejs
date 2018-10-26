var express = require('express');
var BigNumber = require('bignumber.js');
var app = express();
var jayson = require('jayson');

var ret = {};
ret.jsonrpc = '2.0';
ret.result = null;
ret.success = false;
ret.error = null;

function trlBlockParam(tag) {
  if (!tag) return 'latest';
  else if (tag == 'earliest' || tag == 'latest' || tag == 'pending') return tag;
  else return '0x'.concat(parseInt(tag, 10).toString(16));
}

app.get('/eth_getUncleByBlockNumberAndIndex/:tag/:index/:bool?', function(req, res){
  var config = {};
  config.localRPCaddress = 'http://127.0.0.1:17545'
  var jaysonclient = jayson.client.http(config.localRPCaddress);
  jaysonclient.request('eth_getUncleByBlockNumberAndIndex', [trlBlockParam(req.params.tag), req.params.index], function (error, result) {
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
