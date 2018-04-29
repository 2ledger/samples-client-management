var path = require('path');
global.pathRootApp = path.resolve(__dirname);

var variaveis = require(pathRootApp + '/var.properties.js');

var development = {
	env : global.process.env.NODE_ENV || 'development',
	httpPort : process.env.PORT || 8080,
	httpHost : 'localhost'
};


var production = {
	env : global.process.env.NODE_ENV || 'development',
	httpPort : process.env.PORT || 8080,
	httpHost : 'localhost',
};

exports.Config = development;
