const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const materialschema = mongoose.Schema({
    mat_code: {
        type: String,
        required: true,
         
    },
    mat_name: {
        type: String
       
    },
    // material: {
    //     type: Array,
    // },
   
    
   
})


const material = module.exports = mongoose.model('material',materialschema);

module.exports.addMaterial = function(materialdata,callback){
    materialdata.save(callback)
}


module.exports.getMaterialById = function(id, callback){
    const query = {mat_code: id}
    material.find(query,callback);
}

module.exports.getMaterialList = function(pageno,callback){
    material.find( callback).skip(50*(pageno-1)).limit(50).sort({$natural:-1})
   
}




