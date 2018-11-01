var express = require('express');
var BigNumber = require('bignumber.js');
var app = express();
var Web3 = require('web3');
var web3 = new Web3();
function resultToJson(err, param) {
  var ret = {};
  ret.jsonrpc = 'esn';
  ret.success = false;
  ret.result = null;

  if (err) {
    ret.result = err;
  } else if (param) {
    ret.result = param;
    ret.success = true;
  }
  return ret;
}

app.get('/eth_getBlockByNumber/:tag/:bool?', function(req, res){
  var config = {};
  config.localRPCaddress = 'http://127.0.0.1:17545'
  var provider = new web3.providers.HttpProvider(config.localRPCaddress);
  web3.setProvider(provider);
  web3.eth.getBlock(req.params.tag, (req.params.bool && req.params.bool == 'true'), function (err, result) {
    console.log('[Error]', err);
    console.log('[Result]', result);

    res.json(resultToJson(err, result));
  });
});

app.listen(50508);
