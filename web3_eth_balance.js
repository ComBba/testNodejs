var express = require('express');
var BigNumber = require('bignumber.js');
var app = express();
var Web3 = require('web3');
var web3 = new Web3();

app.get('/eth_balance_direct/:address/:tag?', function(req, res){
  var config = {};
  config.localRPCaddress = 'http://127.0.0.1:17545'
  var provider = new web3.providers.HttpProvider(config.localRPCaddress);
  web3.setProvider(provider);
  web3.eth.getBalance(req.params.address, req.params.tag, function (err, result) {
    console.log('[Error]', err);
    console.log('[Result]', result);

    res.json(resultToJson(err, result.toString(10)));
  });
});

app.listen(50508);
