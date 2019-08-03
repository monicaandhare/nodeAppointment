const mongoose = require('mongoose');


const assignschema = mongoose.Schema({
   
    assign_id: {
        type: String,
        required:true    
    },
    mat_code: {
        type: String    
    },
    bin_code: {
        type: String,
        required:true    
    },
    capacity: {
        type: String    
    }

}) 


const assign = module.exports = mongoose.model('assign',assignschema);

module.exports.addassign = function(newassign,callback){
    console.log(newassign)
    newassign.save(callback)
}
 

module.exports.getassignById = function(id, callback){
    const query = {assign_id: id}
    assign.find(query,callback);
}


module.exports.getassignlistbyBincode = function(bincode, callback){
    const query = {bin_code: bincode}
    assign.find(query,callback);
}

module.exports.getassignList = function(pageno,callback){
    assign.blu
    assign.find(callback).skip(50*(pageno-1)).limit(50).sort({$natural:-1})
   
}




