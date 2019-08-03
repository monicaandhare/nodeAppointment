const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const binschema = mongoose.Schema({
    bin_code: {
        type: String,
        required: true
    },
    bin_details: {
        type: String    
    }

}) 


const bin = module.exports = mongoose.model('bin',binschema);

module.exports.addbin = function(bindata,callback){
    console.log(bindata)
    bindata.save(callback)
}


module.exports.getBinById = function(id, callback){
    const query = {bin_code: id}
    bin.find(query,callback);
}

module.exports.getbinList = function(pageno,callback){
    bin.find(callback).skip(50*(pageno-1)).limit(50).sort({$natural:-1})
   
}




