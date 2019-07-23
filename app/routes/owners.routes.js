module.exports = function (app) {
    var owners = require('../controllers/owners.controller.js');

    app.get('/api/companies/owners/init', owners.init);
    app.get('/api/owners', owners.findAll);
    app.get('/api/owners/:companyId',owners.findByCompanyId);
    app.post('/api/owners', owners.create);
    app.delete('/api/owners/:ownerId', owners.delete);
    app.put('/api/owners/:ownerId', owners.update);
};
