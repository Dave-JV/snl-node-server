var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');
var utils = require('./src/utils');
var app = express();
var appPort = 64001;
var dbUtils = require('./src/database.utils');
var barUtils = require('./src/bars');
var drinksUtils = require('./src/drinks');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

console.log('app use initialised');

app.get('/barinfo', function(req, res) {
    utils.escape(() => {
        dbUtils.queryDatabase('SELECT * FROM bars', undefined, function(bars) {
            res.end(barUtils.convertDBBarObjectsToJSON(bars));
        });
    }, (error) => {
        console.log(error);
        res.send(503);
    })
});

app.get('/drinkinfo', function(req, res) {
    utils.escape(() => {
        queryNightLifeDatabase('SELECT * FROM drinks', undefined, function(drinks) {
            res.end(drinksUtils.convertDrinkDBObjectsToJSON(drinks));
        });
    }, (error) => {
        console.log(error);
        res.send(503);
    })
});

console.log('listeners initialised');

//Test for continuous deployment

//var httpServer = http.createServer(app).listen(appPort);

app.listen(appPort, 'localhost');

console.log('server listening', app);