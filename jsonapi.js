var express = require('express');
var BigNumber = require('bignumber.js');
var app = express();
var jayson = require('jayson');
var curl = require('curl');
var request = require('request');

app.get('/', function(req, res){
        var headers = {
          'Origin': 'https://www.bimax.io',
          //'Accept-Encoding': 'gzip, deflate, br',
          //'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
          //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          //'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Referer': 'https://www.bimax.io/trade',
        };

        var formData = {
          pairName: "BTC/KRW"
        };

        var options = {
          url: 'https://api2.bimax.io/ticker/publicSignV2',
          method: 'POST',
          headers: headers,
          form: formData
        };

        request.post(options, function (error, response, body) {
          if (error) {
            console.error(error);
	    res.json(error);
          } else {
            console.log(body);
	    var ticker = JSON.parse(body.trim());
	    res.json(ticker);
          }
	});
});
app.listen(50508);
