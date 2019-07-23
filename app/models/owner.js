const mongoose = require('mongoose'), Schema = mongoose.Schema;
const  OwnerSchema = mongoose.Schema ({
    name: String,
    companies: [{ type: Schema.Types.ObjectId, ref: 'Company'}],
});
module.exports = mongoose.model('Owner', OwnerSchema);
