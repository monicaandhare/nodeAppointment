const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
//const authentication = require('./authentication')

const userschema = mongoose.Schema({

    user_id: {
        type: Number,
        required: true,
             },

    username: {
        type: String,
           },

    password: {
        type: String,
      },

    user_role_id: {
        type: String,
    },

    person_id:{
        type:String
    },

    branch: {
        type: String,
           },

    enabled: {
        type: String,
      },

      app_list: {
        type: String,
    },
    branch_list:{
        type:String
    },
    device_id:{
        type:String
    }  
})


const user = module.exports = mongoose.model('user',userschema);

module.exports.addUser = function(data,callback){
    console.log(data)
    data.save(callback)
}

// module.exports.findUserByUnamePassword(data, (authentication, callback) => {
//     console.log(data)
//     console.log("1")
//     user.find({username:data.username,password:data.password},authentication, callback);
// })

module.exports.findUserByUnamePassword=function(data,callback){
    console.log(data)
    user.find({username:data.username,password:data.password},callback)
}


module.exports.getUserById = function(id, callback){
    const query = {user_id: id}
    user.find(query,callback);
}



module.exports.getUserList = function(pageno,callback){
    user.find( callback).skip(50*(pageno-1)).limit(50).sort({$natural:-1})
   }


