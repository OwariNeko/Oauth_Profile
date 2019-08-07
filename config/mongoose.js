//var config =require('./config')
const mongoose = require('mongoose')
const collection = "profile"
// read package.json<Scripts> 
// const ORG = process.env.ORG.toLocaleLowerCase()
const url =`mongodb+srv://development:ZGFMzUvDJ745GFDq@clustermaster-zvis2.mongodb.net/${collection}?retryWrites=true&w=majority`;
module.exports =  function () {
    mongoose.set('debug :', true);
    console.info('mongoUri :'+url);
    var db = mongoose.connect(url,
        { useNewUrlParser : true}
    );

    require('../models/profile');
    return db

}