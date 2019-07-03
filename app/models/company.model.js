const Product = require('../models/product.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;
//Cоздает связь между объектом Компани и записью в БД
const CompanySchema = mongoose.Schema({
    name: String,
    street: String,
    phone: String
});

module.exports = mongoose.model('Company', CompanySchema);
