'use strict';

var express = require('express'),
    contentType = require('content-type'),
    concat = require('concat-stream'),
    load = require('express-load'),
    app = express(),
    getRawBody = require('raw-body'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    cfg = require('./config').Config,
    http = require("http");

var path = require('path');
global.pathRootApp = path.resolve(__dirname);

app.use(methodOverride());
app.use(bodyParser.json({limit:1024102420, type:'application/json'}));
app.use(bodyParser.text());

console.log('here1');
global.env = cfg.env;
global.cfg = cfg;

console.log('here1:'+cfg);
console.log('here2:'+global.cfg);
console.log('here3:'+cfg.API_2LEDGER_TOKEN);
console.log('here4:'+global.cfg.API_2LEDGER_TOKEN);

app.use(function(req, res, next) {
    console.info(req.url);
    next();
});

load('models')
    .then('controllers')
    .then('models')
    .then('routes')
    .into(app);

var serveIndex = require('serve-index');

app.use(cookieParser());

app.use('/', express.static(__dirname + '/public/', { 'index': 'index.html' }));
 
app.listen(cfg.port, cfg.host, function () {
    console.info("########################################################################");
    console.info("##              POWER        SERVER STARTED              POWER        ##");
    console.info("########################################################################");
    console.info('Enviroment: ', cfg.env);
    console.info('URL: ', cfg.host + ":" + cfg.port);
    console.info('API_2LEDGER_TOKEN: ', cfg.API_2LEDGER_TOKEN);
    console.info("------------------------------------------------------------------------");
});

console.info("------------------------------------------------------------------------");
