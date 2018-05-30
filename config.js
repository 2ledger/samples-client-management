var development = {
	env : global.process.env.NODE_ENV || 'development',
	port : global.process.env.PORT || 8080,
	host : global.process.env.HOST || 'localhost',
	API_2LEDGER : global.process.env.API_2LEDGER || 'sandbox.2ledger.com',
	API_2LEDGER_TOKEN : global.process.env.API_2LEDGER_TOKEN || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MjczODIxMDYsImV4cCI6MTg3NDUzNzMwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImRhdGEiOiJ7ICAgICBcImlkXCI6IFwiNWFhYzcxMTMwMGQ1NmMwMDM2NDBhZGQ1XCIsICAgICBcIm5hbWVcIjogXCJFbW1hbnVlbCBLaWFtZXRpc1wiLCAgICAgXCJlbWFpbFwiOiBcImtpYW1ldGlzOTFAZ21haWwuY29tXCIsICAgICBcIm5pY2tuYW1lXCI6IFwiZWtpYW1ldGlzXCIsICAgICBcInN0YXR1c1wiOiBcIkFwcHJvdmVkXCIsICAgICBcImNyZWF0ZWRBdFwiOiBcIjIwMTgtMDMtMTdUMDE6MzY6MTkuMTA0WlwiIH0ifQ.8oUSsSPb-7MMbWTcOvzeYUQcwujA77WrSzyktsPVMEc',
	token : global.process.env.API_2LEDGER_TOKEN || '.',
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID : global.process.env.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID || '5b0f1f3629b63b00396c6458'
};

var production = {
	env : global.process.env.NODE_ENV || 'production',
	port : 8080,
	host : global.process.env.HOST || 'localhost',
	API_2LEDGER : global.process.env.API_2LEDGER,
	API_2LEDGER_TOKEN : global.process.env.API_2LEDGER_TOKEN,
	token : global.process.env.API_2LEDGER_TOKEN || '.',
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID : global.process.env.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID
};

exports.Config = global.process.env.NODE_ENV === 'production' ? production : development;
