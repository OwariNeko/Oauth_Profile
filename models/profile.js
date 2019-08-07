var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const profile = new Schema ({
    identity : {type: String, unique: true },
    companyName: {type: String },
    txid: {type: String },
    birthDay: {type: String },
    address: {type: String },
    zipcode: {type: String }

});


module.exports=mongoose.model('profile',profile)
