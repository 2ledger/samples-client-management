module.exports = function(app) {
	var graficos = app.controllers.graficosController;
		
	app.post('/chat/buscasAtendimentosPorMes', graficos.buscasAtendimentosPorMes);
	app.post('/chat/buscasAtendimentosPorAno', graficos.buscasAtendimentosPorAno);	
	app.post('/chat/buscasAtendimentosPorDia', graficos.buscasAtendimentosPorDia);	
	app.post('/chat/buscasAtendimentosPorCooperativa', graficos.buscasAtendimentosPorCooperativa);	
	
};
