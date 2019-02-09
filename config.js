var development = {
	env : global.process.env.NODE_ENV || 'development',
	port : global.process.env.PORT || 8080,
	host : global.process.env.HOST || 'localhost',
	API_2LEDGER : global.process.env.API_2LEDGER || '2ledger-api-dev-teste.azurewebsites.net',
	API_2LEDGER_TOKEN : global.process.env.API_2LEDGER_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNWM1ZTIxYTQwZTE2ZTQwMDllNThhNTMxIiwibmFtZSI6IkVtbWFudWVsIEtpYW1ldGlzIiwiZW1haWwiOiJraWFtZXRpc0BnbWFpbC5jb20iLCJuaWNrbmFtZSI6ImtpYW1ldGlzIiwic3RhdHVzIjoiQXBwcm92ZWQiLCJsYW5ndWFnZSI6ImVuIiwic2lnbmF0dXJlIjoiNWM1ZTIxYTYwZTE2ZTQwMDllNThhNTMyIiwiY3JlYXRlZEF0IjoiMjAxOS0wMi0wOVQwMDo0MTowOS4yMzFaIn0sImV4cCI6Mzc1NDk2NzM3MzAsImlhdCI6MTU0OTY3MzczMH0.LkAAvghhKK1cscpqSebX321hUrjSqB0J5UB02m1_sKg',
	token : global.process.env.API_2LEDGER_TOKEN || '.',
	API_2LEDGER_SAMPLE_ID_NETWORK : '5c5e31d01f76dd0095141274',
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID : global.process.env.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID || '5c5e31df1f76dd0095141276'
};

var production = {
	env : global.process.env.NODE_ENV || 'production',
	port : 8080,
	host : global.process.env.HOST || 'localhost',
	API_2LEDGER : global.process.env.API_2LEDGER,
	API_2LEDGER_TOKEN : global.process.env.API_2LEDGER_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNWM1ZTIxYTQwZTE2ZTQwMDllNThhNTMxIiwibmFtZSI6IkVtbWFudWVsIEtpYW1ldGlzIiwiZW1haWwiOiJraWFtZXRpc0BnbWFpbC5jb20iLCJuaWNrbmFtZSI6ImtpYW1ldGlzIiwic3RhdHVzIjoiQXBwcm92ZWQiLCJsYW5ndWFnZSI6ImVuIiwic2lnbmF0dXJlIjoiNWM1ZTIxYTYwZTE2ZTQwMDllNThhNTMyIiwiY3JlYXRlZEF0IjoiMjAxOS0wMi0wOVQwMDo0MTowOS4yMzFaIn0sImV4cCI6Mzc1NDk2NzM3MzAsImlhdCI6MTU0OTY3MzczMH0.LkAAvghhKK1cscpqSebX321hUrjSqB0J5UB02m1_sKg',
	token : global.process.env.API_2LEDGER_TOKEN || '.',
	API_2LEDGER_SAMPLE_ID_NETWORK : '5c5e31d01f76dd0095141274',
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID : global.process.env.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID || '5c5e31df1f76dd0095141276'
};

exports.Config = global.process.env.NODE_ENV === 'production' ? production : development;
