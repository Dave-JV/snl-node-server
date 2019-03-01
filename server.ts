import { BarsService } from "./src/bars";
import { Request, Response } from 'express';
import { DrinksService } from "./src/drinks";
import { first } from "lodash";

var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');
var utils = require('./src/utils/utils');
var app = express();
const appPort: number = 64001;
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./src/swagger.json');
const cors = require('cors')

app.use(function(req: Request, res: Response, next: () => any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

console.log('app use initialised');

app.get('/barinfo', async (req: Request, res: Response) => {
    const bars = await new BarsService().getBars();
    utils.escape(() => {
        res.end(JSON.stringify({bars}));
    }, (error: Error) => {
        console.log(error);
        res.send(503);
    })
});

app.get('/drinkinfo', async (req: Request, res: Response) => {
    const drinks = await new DrinksService().getDrinks();
    utils.escape(() => {
        res.end(JSON.stringify({drinks}));
    }, (error: Error) => {
        console.log(error);
        res.send(503);
    })
});

app.get('/bars/:barId', async (req: Request, res: Response) => {
    const bars = await new BarsService().getBar(req.params['barId']);
    utils.escape(() => {
        res.end(JSON.stringify({bar: first(bars)}));
    }, (error: Error) => {
        console.log(error);
        res.send(503);
    })
});

app.get('/bars/:barId/drinks', async (req: Request, res: Response) => {
    const drinks = await new DrinksService().getBarDrinks(req.params['barId']);
    utils.escape(() => {
        res.end(JSON.stringify({drinks}));
    }, (error: Error) => {
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