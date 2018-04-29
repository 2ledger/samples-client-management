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
global.varsAmbiente = require(pathRootApp + '/var.properties.js');

var logger = require('./lib/logger.js');

app.use(methodOverride());
app.use(bodyParser.json({limit:1024102420, type:'application/json'}));
app.use(bodyParser.text());

global.env = cfg.env;

load('models')
    .then('controllers')
    .then('models')
    .then('routes')
    .into(app);

var serveIndex = require('serve-index');

app.use(cookieParser());

app.use('/', express.static(__dirname + '/public/', { 'index': 'index.html' }));
 
app.listen(cfg.httpPort, cfg.httpsHost, function () {
    console.info("########################################################################");
    console.info("##              POWER        SERVIDOR INICIADO           POWER        ##");
    console.info("########################################################################");
    console.info('Ambiente: ', cfg.env);
    console.info('URL: ', cfg.httpHost + ":" + cfg.httpPort);
    console.info("------------------------------------------------------------------------");
    logger.info("Servidor iniciado na porta:", cfg.httpHost + ":" + cfg.httpPort);
});

console.info("------------------------------------------------------------------------");
