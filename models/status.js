const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const statusschema = mongoose.Schema({
    status_id: {
        type: Number,
        unique:true,
        required: true
    },
    status_name: {
        type: String    
    }

}) 


const status = module.exports = mongoose.model('status',statusschema);

module.exports.addstatus = function(statusdata,callback){
    console.log(statusdata)
    statusdata.save(callback)
}


module.exports.getStatusById = function(id, callback){
    const query = {status_id: id}
    status.find(query,callback);
}

module.exports.getStatusList = function(callback){
    status.find(callback)
   
}




