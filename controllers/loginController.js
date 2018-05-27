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
		return new Promise((resolve, reject) => {
			var auth = global.cfg.API_2LEDGER_TOKEN;

			const options = {
				hostname: global.cfg.API_2LEDGER,
				method: 'GET',
				path: '/v1' + path,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + auth
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
				logger.info(`problem with request: ${e.message}`);
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
					'Authorization': 'Bearer ' + auth
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
				logger.info(`problem with request: ${e.message}`);
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
				headers: { 'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + auth
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
				logger.info(`problem with request: ${e.message}`);
			});
			req.write(JSON.stringify(data));
			req.end();
		});
	}

	var loginController = {

		///////////////////////////////////////////////////////////////////////
		// buscarConfiguracoes
		// Método para retornar as configurações do aplicativo
		///////////////////////////////////////////////////////////////////////
		getToken: function (req, res) {

			const basic = Buffer.from('adm_UserManager@gmail.com:123456');
			const options = {
				hostname: global.cfg.API_2LEDGER,
				method: 'POST',
				path: '/v1/login',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + basic
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

					res.send({ 'sucess': 'true' });
				});
			});
			req2.on('error', (e) => {
				logger.info(`problem with request: ${e.message}`);
			});
			req2.end();
		},


		///////////////////////////////////////////////////////////////////////
		// loginClient
		// Metod
		///////////////////////////////////////////////////////////////////////
		loginClient: function (req, res) {
			var emailClient = req.body.emailClient;
			var passwordClient = req.body.passwordClient;

			chamadaGET('/records/' + encodeURIComponent(emailClient)).then(d => {
				var client = JSON.parse(d);

				if (client.success == 'false')
					res.send({ type: 'error', message: 'Client doesn´t exist' });
				if (client.response.record.value.status == 'inactive')
					res.send({ type: 'error', message: 'Client doesn´t exist' });
				else if (passwordClient == client.response.record.value.passwordClient)
					res.send({ type: 'success', data: client.response.record.value });
				else
					res.send({ type: 'error', message: 'Wrong password' });
			})
		},

	}

	return loginController;
}

