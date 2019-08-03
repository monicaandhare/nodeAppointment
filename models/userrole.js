const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const userschema = mongoose.Schema({
    urole_id: {
        type: Number,
        required: true,
         
    },
    urole: {
        type: String,
       
    },
    entityaccess: [
        {
               entity:{type:String},
               accesscode:{type:String},
      }
    ],

    
     

   
    
   
})


const userrole = module.exports = mongoose.model('userrole',userschema);

module.exports.addUser = function(data,callback){
    data.save(callback)
}


module.exports.getUserById = function(id, callback){
    const query = {user_id: id}
    material.find(query,callback);
}

module.exports.getUserList = function(pageno,callback){
    material.find( callback).skip(50*(pageno-1)).limit(50).sort({$natural:-1})
   
}

