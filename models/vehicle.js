const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const vehicleschema = mongoose.Schema({
    vehicle_id: {
        type: Number,
        required: true,
    },
    vehicle_no: {
        type: String,
    },
    driver_name: {
        type: String,  
    },
    licene_no: {
        type: String, 
    },
    tranp_name: {
        type: String,
    },
    vehicle_name:{
       type:String
   },
    user_name:{
        type:Array,   
    }
})


const vehicle = module.exports = mongoose.model('vehicle',vehicleschema);

module.exports.addvehicle = function(newvdetail,callback){
    console.log(newvdetail)
    newvdetail.save(callback)
}


module.exports.getVehicleById = function(id, callback){
  
  
    const query = {vehicle_id: id}
    vehicle.find(query,callback);

}


module.exports.getVehicleList = function(id, callback){  
    console.log(id)
    vehicle.find(callback).skip(10*(id)).limit(10);

}

module.exports.getLatestId = function( callback){  
    
    vehicle.find(callback).limit(1).sort({$natural:-1});
}
module.exports.getVehicleByVehNo = function(id, callback){  
    console.log(id)
    vehicle.find({vehicle_no:id},callback);

}