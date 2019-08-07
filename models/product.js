var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const product = new Schema ({
    identity : {type: String, unique: true },
    companyName: {type: String },
    txid: {type: String },
    birthDay: {type: String },
    address: {type: String },
    zipcode: {type: String }


});



module.exports=mongoose.model('product',product)
