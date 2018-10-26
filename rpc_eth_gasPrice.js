var express = require('express');
var BigNumber = require('bignumber.js');
var app = express();
var jayson = require('jayson');
function initRet() {
  var ret = {};
  ret.jsonrpc = '2.0';
  ret.result = null;
  ret.success = false;
  ret.error = null;
  return ret;
}

function returnRet(error, result) {
  var ret = initRet();
  if (error) {
    ret.error = error;
    return ret;
  } else if (result) {
    if (result.error) {
      result.success = false;
      result.result = null;
    } else {
      result.success = true;
    }
    return result;
  } else {
    return ret;
  }
}

function trlBlockParam(tag) {
  if (!tag) return 'latest';
  else if (tag == 'earliest' || tag == 'latest' || tag == 'pending') return tag;
  else return '0x'.concat(parseInt(tag, 10).toString(16));
}

app.get('/eth_gasPrice', function(req, res){
  var config = {};
  config.localRPCaddress = 'http://127.0.0.1:17545';
  var jaysonclient = jayson.client.http(config.localRPCaddress);
  jaysonclient.request('eth_gasPrice', [], function (error, result) {
    if (result && !result.error) {
      result.result = (new BigNumber(result.result)).toNumber();
    }
    res.json(returnRet(error, result));
  });
});

app.listen(50508);
