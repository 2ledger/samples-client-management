'use strict';

var Promise = require('promise');
var https = require('https');
var querystring = require('querystring');


module.exports = function (app) {
	///////////////////////////////////////////////////////////////////////
	// ChamadaGET
	// Método para chamadas GET
	///////////////////////////////////////////////////////////////////////
	function chamadaGET(path) {
		console.log(path);
		return new Promise((resolve, reject) => {
			var auth = global.cfg.API_2LEDGER_TOKEN;
			const options = {
				hostname: global.cfg.API_2LEDGER,
				method: 'GET',
				path: '/v1' + path,
				headers: {
					'Content-Type': 'application/json',
					'X-JWT-Assertion': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNWFhYWYwOGQxNmM5Y2EyMjc0OGEzYjNiIiwibmFtZSI6Ik1hcmNpbyBBbGV4YW5kcmUiLCJlbWFpbCI6Im1hcmNpb2FtckBnbWFpbC5jb20iLCJuaWNrbmFtZSI6Ik1hcmNpbyIsInN0YXR1cyI6IkFwcHJvdmVkIiwiY3JlYXRlZEF0IjoiMjAxOC0wMy0xNVQyMjoxNTo0MS4wNTRaIn0sImV4cCI6MTUyNzM0ODI0NCwiaWF0IjoxNTI3MzQ0NjQ0fQ.TBRqIhsqdhp0bmxfjD2Weq1yOZcMir66uKV5XqqVfLQ'
				}
			};
			console.log(options);
			const req = https.request(options, (response) => {
				response.setEncoding('utf8');
				var body = '';

				response.on('data', (retorno) => {
					body += retorno;
				});

				response.on('end', function () {
					resolve(body);
				});
				response.on('error', (e) => {
					console.error(`problem with request: ${e.message}`);
				});
			});
			req.on('error', (e) => {
				console.error(`problem with request: ${e.message}`);
			});
			req.end();
		});
	}

	///////////////////////////////////////////////////////////////////////
	// ChamadaDELETE
	// Método para chamadas DELETE
	///////////////////////////////////////////////////////////////////////
	function chamadaDELETE(path) {
		return new Promise((resolve, reject) => {
			var auth = global.cfg.API_2LEDGER_TOKEN;

			const options = {
				hostname: global.cfg.API_2LEDGER,
				method: 'DELETE',
				path: '/v1' + path,
				headers: {
					'Content-Type': 'application/json',
					'X-JWT-Assertion': auth
				}
			};

			const req = https.request(options, (response) => {
				response.setEncoding('utf8');
				var body = '';

				response.on('data', (retorno) => {
					body += retorno;
				});

				response.on('end', function () {
					resolve(body);
				});
				
			});
			req.on('error', (e) => {
				console.info(`problem with request: ${e.message}`);
			});
			req.end();
		});
	}

	///////////////////////////////////////////////////////////////////////
	// ChamadaPOST
	// Método para chamadas POST
	///////////////////////////////////////////////////////////////////////
	function chamadaPOST(path, data) {
		return new Promise((resolve, reject) => {
			var auth = global.cfg.API_2LEDGER_TOKEN;

			const options = {
				hostname: global.cfg.API_2LEDGER,
				method: 'POST',
				path: '/v1' + path,
				headers: {
					'Content-Type': 'application/json',
					'X-JWT-Assertion': auth
				}
			};

			const req = https.request(options, (response) => {
				var body = '';

				response.setEncoding('utf8');
				response.on('data', (retorno) => {
					body += retorno;
				});

				response.on('end', function () {
					resolve(body);
				});
			});
			req.on('error', (e) => {
				console.info(`problem with request: ${e.message}`);
			});
			req.write(JSON.stringify(data));
			req.end();
		});
	}

	var clientController = {

		///////////////////////////////////////////////////////////////////////
		// buscarConfiguracoes
		// Método para retornar as configurações do aplicativo
		///////////////////////////////////////////////////////////////////////
		getToken: function (req, res) {

			const options = {
				hostname: global.cfg.API_2LEDGER,
				method: 'POST',
				path: '/v1/login',
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const req2 = https.request(options, (response) => {
				response.setEncoding('utf8');
				var body = '';

				response.on('data', (retorno) => {
					body += retorno;
				});

				response.on('end', function () {
					global.cfg.API_2LEDGER_TOKEN = JSON.parse(body).response;

					res.send({'sucess':'true'});
				});
			});
			req2.on('error', (e) => {
				console.info(`problem with request: ${e.message}`);
			});
			req2.write(JSON.stringify({ email: 'adm_UserManager@gmail.com', password: '123456' }));
			req2.end();
		},


		///////////////////////////////////////////////////////////////////////
		// getAll
		// Metod
		///////////////////////////////////////////////////////////////////////
		getAllClients: function (req, res) {
			chamadaGET('/entities/' + global.cfg.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID + '/records').then(d => {
				var list = JSON.parse(d).response;
				var obj = {};
				var result = [];

				for(var k = 0 ; k < list.length; k++){
					if(!obj[list[k].key]){
						obj[list[k].key] = {};
						obj[list[k].key].versions = [];
						obj[list[k].key].versions.push(list[k]);
					}
					else{
						obj[list[k].key].versions.push(list[k]);
					}
				}

				for (var key in obj) {
					var versao = obj[key].versions[obj[key].versions.length - 1];
					if(versao.value.status != 'inactive')
						result.push(versao)
				}

				res.send(result);
			})
		},

		///////////////////////////////////////////////////////////////////////
		// saveClient
		// Metod
		///////////////////////////////////////////////////////////////////////
		saveClient: function (req, res) {
			var value = req.body.data;
			value.status = 'active';

			var obj = {key:req.body.id, value:value};
			chamadaPOST('/entities/' + global.cfg.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID + '/records', obj).then(d => {
				res.send(JSON.parse(d).response);
			})
		},

		///////////////////////////////////////////////////////////////////////
		// deleteClient
		// Metod
		///////////////////////////////////////////////////////////////////////
		deleteClient: function (req, res) {
			var value = req.body.data;
			value.status = 'inactive';

			var obj = {key:req.body.id, value:value};
			chamadaPOST('/entities/' + global.cfg.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID + '/records', obj).then(d => {
				res.send(JSON.parse(d).response);
			})
		},		

		///////////////////////////////////////////////////////////////////////
		// deleteClient
		// Metod
		///////////////////////////////////////////////////////////////////////
		searchClient: function (req, res) {
			var param = req.params.client;

			chamadaGET('/entities/' + global.cfg.API_2LEDGER_SAMPLE_CLIENT_ENTITY_ID + '/records').then(d => {
				var list = JSON.parse(d).response;
				var obj = {};
				var result = [];

				for(var k = 0 ; k < list.length; k++){
					if(!obj[list[k].key]){
						obj[list[k].key] = {};
						obj[list[k].key].versions = [];
						obj[list[k].key].versions.push(list[k]);
					}
					else{
						obj[list[k].key].versions.push(list[k]);
					}
				}

				for (var key in obj) {
					var versao = obj[key].versions[obj[key].versions.length - 1];
					if(versao.value.status != 'inactive' && (versao.value.nameClient.indexOf(param) >= 0 || versao.value.emailClient.indexOf(param) >= 0 || versao.value.addressClient.indexOf(param) >= 0))
						result.push(versao)
				}

				res.send(result);
			})
		},		
		
	}

	return clientController;
}

