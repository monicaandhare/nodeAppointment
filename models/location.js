const mongoose = require('mongoose');


const locationschema = mongoose.Schema({
    loc_id: {
        type: Number,
        required: true,
         
    },
     loc_name: {
        type: String,
       
    },
    loc_incharge: {
        type: String,
    },
    description:{
        type:String
    },
    username:{
        type:String
    }
   
    
   
})


const location = module.exports = mongoose.model('location',locationschema);

module.exports.addLocation = function(data,callback){
    data.save(callback)
}


module.exports.locationById = function(id, callback){
    const query = {loc_id: id}
    location.find(query,callback);
}

module.exports.getLocationList = function(pageno,callback){
    location.find( callback).skip(50*(pageno-1)).limit(50).sort({$natural:-1})
   
}




