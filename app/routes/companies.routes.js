module.exports = function(app) {

	var companies = require('../controllers/companies.controller.js');
	
	app.get('/api/companies/init', companies.init);
	app.get('/api/companies', companies.findAll);
	app.put('/api/companies/:companyId', companies.update);
	app.delete('/api/companies/:companyId', companies.delete);
};
