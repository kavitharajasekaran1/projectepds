
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loggerpac = require('morgan');
const router = express.Router();
var cors = require('cors');

//var logger;
var Promise = require('bluebird');
//var log4js = require('log4js');
var config = require('config');
//const log4js = require('./log4js-node/lib/log4js');

const port = process.env.PORT || 8082;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(loggerpac('dev'));
app.use(cors());
require('./routes')(router);
app.use('/', router);
app.listen(port);


console.log(`App Runs on ${port}`);



