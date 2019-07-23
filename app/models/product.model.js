const Company = require('../models/company.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    code: String,
    name: String,
	details: String,
	company : { type: Schema.Types.Object, ref: 'Company'}
});

module.exports = mongoose.model('Product', ProductSchema);
