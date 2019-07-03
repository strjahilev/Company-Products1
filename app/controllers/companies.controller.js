const Company = require('../models/company.model.js');
const Product = require('../models/product.model.js');

exports.init = (req, res) => {
  var apple = new Company({ 
	name: 'Apple', 
	street: 'Cupertino, CA 95014', 
	phone: '1-408-996-1010' 
  });

  apple.save(function (err) {
    if(err) return console.error(err.stack)
	
	console.log("Apple company is added")
	
    //Apple now exists, so lets create a Product
    var iphone7 = new Product({
	  code: "A-123",
	  name: "Iphone7",
	  details: "Price: 649.00 USD & FREE shipping",
	  company: apple._id
    });

    iphone7.save(function (err) {
	  if(err) return console.error(err.stack)
	  
	  console.log("Iphone 7 is added")
    });
	
	var iPadPro = new Product({
	  code: "A-456",
	  name: "IPadPro",
	  details: "Price: 417.67 USD & FREE shipping",
	  company: apple._id
	});
	
	iPadPro.save(function(err){
		if(err) return console.error(err.stack)
		
		console.log("IPadPro is added");
	});
	
  });
  
  
  var samsung = new Company({ 
		name: 'Samsung', 
		street: 'Seocho District, Seoul, South Korea', 
		phone: '+82-2-2053-3000'
	});
  
  samsung.save(function(err){
	if(err) return console.error(err.stack)
	
	console.log("Samsung company is added")
	
	// Samsung now exists, so lets create a Product
	var galaxyJ7 = new Product({
	  code: "S-012",
	  name: "GalaxyJ7",
	  details: "Price: 219.00 USD & FREE shipping",
	  company: samsung._id	
	});
	
	galaxyJ7.save(function(err){
		if(err) return console.error(err.stack)
		console.log("GalaxyJ7 is added")
	});
	
	var galaxyTabA = new Product({
	  code: "S-456",
	  name: "GalaxyTabA",
	  details: "Price: 299.99 USD & FREE shipping",
	  company: samsung._id
	});
	
	galaxyTabA.save(function(err){
		if(err) return console.error(err.stack)
		console.log("GalaxyTabA is added")
	})
  });
  
  res.send("Done Initial Data!");
};

exports.findAll = (req, res) => {
	Company.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.create = (req, res) =>{
if (!req.body){
	return res.sendStatus(400);
	const compName = req.body.name;
	const compStreet = req.body.street;
	const compPhone = req.body.phone
}
Company({name: compName, street: compStreet, phone: compPhone });
company.save(function (err) {
	if(err){
		return console.log(err);
		res.send(company);
	}
});
};
exports.update = (req, res) =>{
		if (!req.body.name) {
			return res.status(400).send({
				message: "Company content can not be empty"
			})
		}

		Company.findByIdAndUpdate(req.params.companyId, {
			name: req.body.name || "Untitled Name",
			street: req.body.street,
			phone: req.body.phone
		}, {new: true})
			.then(company =>{
				if(!company){
					return res.status(404).send({
					message: "Company not found with id " + req.params.companyId
					});
				}
				res.send(company);
			}).catch(err =>{
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Company not found with id " + req.params.companyId
				});
			}
			return res.status(500).send({
				message: "Error updating company with id " + req.params.companyId
			});
		});
};
exports.delete = (req, res) => {
		Company.findByIdAndRemove(req.params.companyId)
			.then(companyId => {
				if(!companyId){
					return res.status(404).send({
						message: "Company not found with id" + req.params.companyId
					});
				}
				res.send({message:"Company deleted successfully!"});
			}).catch(err =>{
				if(err.kind==='ObjectId'||err.name==='Not found'){
					return res.status(404).send({
						message:"Company not found with id" + req.params.companyId
					});
				}
				return res.status(500).send({
					message:"Could not delete company with id " + req.params.companyId
				});
		});
};
