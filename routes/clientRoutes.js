module.exports = function(app) {
	var client = app.controllers.clientController;
	var login = app.controllers.loginController;

	app.get('/client/getToken', client.getToken);
	app.get('/client/getAllClients', client.getAllClients);
	app.post('/client/saveClient', client.saveClient);
	app.post('/login/loginClient', login.loginClient);
	
	app.delete('/client/deleteClient', client.deleteClient);
	app.get('/client/searchClient/:client' , client.searchClient);
	
};
