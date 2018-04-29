var PropertiesReader = require('properties-reader');
var variaveis = PropertiesReader('./variaveis.ini');

module.exports = {
	API_2LEDGER: variaveis.get('API_2LEDGER'),
	API_2LEDGER_TOKEN: variaveis.get('API_2LEDGER_TOKEN'),
	API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID: variaveis.get('API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID'),
}
