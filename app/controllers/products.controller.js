const Company = require('../models/company.model.js');
const Product = require('../models/product.model.js');

exports.findAll = (req, res) => {
	
	Product.aggregate([
		{ $lookup:
				{
					from: 'companies',
					localField: 'company',
					foreignField: '_id',
					as: 'company'
				}
		}]

	)

    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Find a Products by Name
exports.findByName = (req, res) => {
	Product.findOne({ name: req.params.productName })
	.populate('company')
	.exec(function (err, product) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Products not found with given name " + req.params.productName
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Products with given Company Id " + req.params.productName
			});
		}
					
		res.send(product);
	});
};

// Find all products by a CompanyId
exports.findByCompanyId = (req, res) => {
    Company.findOne({ _id : req.params.companyId })
	.exec(function (err, companies) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Products not found with given Company Id " + req.params.companyId
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Products with given Company Id " + req.params.companyId
			});
		}
					
		res.send(companies);
	});
};

exports.create = (req, res) =>{
	if (!req.body) {
		return res.sendStatus(400);
	}
	const prodCode = req.body.code;
	const prodName = req.body.name;
	const prodDetails = req.body.details;
	const prodCompany = req.body.company;
	const product = Product({code: prodCode, name: prodName, details: prodDetails, company: prodCompany });
	product.save(function (err) {

		if(err){
			return console.log(err)}
		res.send(product);

	});
};
exports.update = (req, res) =>{
	if(!req.body) {
		return res.status(400).send({
			message: "Product content can not be empty"
		});
	}

	Product.findByIdAndUpdate(req.params.productId,{
		code: req.body.code || "Untitled Product",
		name: req.body.name,
		details: req.body.details,
		company:req.body.company,

	}, {new: true})
		.then(product =>{
			if(!product){
				return res.status(404).send({
					message:"Product not found with id" + req.params.productId
				});
			}
			res.send(product);

		}).catch(err =>{
			if(err.kind==='ObjectId'){
				return res.status(404).send({
					message:"Product not found with id " + req.params.productId
				});
			}
			return res.status(500).send({
				message: "Error updating product with id " + req.params.productId
			});
	});
};
exports.delete = (req, res) => {
	Product.findByIdAndRemove(req.params.productId)
		.then(productId =>{
			if(!productId){
				return res.status(404).send({
					message:"Product not found with id" + req.params.productId
				});
			}
			res.send({
				message:"Product deleted successfully!"
			})
		}).catch(err =>{
			if(err==='ObjectId'||err.name==='Not found'){
				return res.status(404).send({
					message:"Product not found with id" + req.params.productId
				})
			}
			return res.status(500).send({
				message:"Could not delete product with id"
			});
	});
};

