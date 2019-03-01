var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');
var utils = require('./src/utils');
var app = express();
var appPort = 64001;
var dbUtils = require('./src/database.utils');
var barUtils = require('./src/bars');
var drinksUtils = require('./src/drinks');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./src/swagger.json');
const cors = require('cors')
const _ = require('lodash');

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
        queryNightlifeDatabase('SELECT * FROM drinks', undefined, function(drinks) {
            res.end(drinksUtils.convertDrinkDBObjectsToJSON(drinks));
        });
    }, (error) => {
        console.log(error);
        res.send(503);
    })
});

app.get('/bars/:barId', function(req, res) {
    utils.escape(() => {
        dbUtils.queryDatabase('SELECT * FROM bars WHERE bar_id = ?', [req.params.barId], function(bars) {
            res.end(JSON.stringify({bar: _.first(bars)}));
        });
    }, (error) => {
        console.log(error);
        res.send(503);
    })
});

app.get('/bars/:barId/drinks', function(req, res) {
    utils.escape(() => {
        dbUtils.queryDatabase('SELECT * FROM drinks WHERE bar_id = ?', [req.params.barId], function(drinks) {
            res.end(drinksUtils.convertDrinkDBObjectsToJSON(drinks));
        });
    }, (error) => {
        console.log(error);
        res.send(503);
    })
});


var corsOptions = {
    origin: 'http://localhost:4200/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  
  app.use(cors(corsOptions))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', router);


console.log('listeners initialised');

//Test for continuous deployment

var httpServer = http.createServer(app).listen(appPort);

console.log('server listening');