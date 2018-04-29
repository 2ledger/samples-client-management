var development = {
	env : global.process.env.NODE_ENV || 'development',
	httpPort : 3000,
	httpHost : '127.0.0.1'
};

var production = {
	env : global.process.env.NODE_ENV || 'production',
	httpPort : 3000,
	httpHost : '127.0.0.1'
};

exports.Config = global.process.env.NODE_ENV === 'production' ? production : development;