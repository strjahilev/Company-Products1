const Company = require('../models/company.model.js');
const Owner = require('../models/owner.js');

exports.init = (req, res) => {
    var Kolja = new Owner({
        name: 'Kolja',

    });
    Kolja.companies.push(apple._id);

    Kolja.save(function (err) {
        if (err) return console.log(err.stack);
        console.log("Kolja is added")
    });
    res.send("Done Initial Data!");
};


exports.findAll = (req, res) => {
    Owner.find()
        .then(owners => {
            res.send(owners);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.findByCompanyId = (req, res) => {
    Owner.find([{ companies : req.params.companyId }])
        .exec(function (err, owners) {
            if (err){
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Owner not found with given Company Id " + req.params.companyId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Owner with given company Id " + req.params.companyId
                });
            }

            res.send(owners);
        });
};
exports.create = (req, res) => {
    if (!req.body){
        return res.sendStatus(400);
    }
    const ownerName = req.body.name;
    const ownerCompanies = req.body.companies;
    const owner = Owner({name: ownerName, companies: ownerCompanies});
    owner.save(function (err) {
        if (err) {
            return console.log (err)
        }
        res.send(owner);
    })
};
exports.delete = (req, res) => {
    Owner.findByIdAndRemove(req.params.ownerId)
        .then(ownerId =>{
            if(!ownerId){
                return res.status(404).send({
                    message:"Owner not found with id" + req.params.ownerId
                });
            }
            res.send({
                message:"Owner deleted successfully!"
            })
        }).catch(err =>{
        if(err==='ObjectId'||err.name==='Not found'){
            return res.status(404).send({
                message:"Owner not found with id" + req.params.ownerId
            })
        }
        return res.status(500).send({
            message:"Could not delete owner with id"
        });
    });
};
exports.update = (req, res) =>{
    if(!req.body) {
        return res.status(400).send({
            message: "Owner content can not be empty"
        });
    }

    Owner.findByIdAndUpdate(req.params.ownerId,{
        name: req.body.name || "Untitled Owner",
        companies:req.body.companies,

    }, {new: true})
        .then(owner =>{
            if(!owner){
                return res.status(404).send({
                    message:"Owner not found with id" + req.params.ownerId
                });
            }
            res.send(owner);

        }).catch(err =>{
        if(err.kind==='ObjectId'){
            return res.status(404).send({
                message:"Owner not found with id " + req.params.ownerId
            });
        }
        return res.status(500).send({
            message: "Error updating owner with id " + req.params.ownerId
        });
    });
};



