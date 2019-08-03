const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const visitordetailSchema = mongoose.Schema({
    p_id: {
        type: Number,
        required: true,
        
    },
    vehicle_id: {
        type: Number
    },
    status: {
        type: Number
    },
    p_mobile_no: {
        type: String,
      
    },
    p_name: {
        type: String,
       
    },
    p_address: {
        type: String,
       
    },
    city: {
        type: String,
       
    },
    pincode: {
        type: String,
       
    },
    email: {
        type: String,
       
    },
    state: {
        type: String,
       
    },
    aadhar_no: {
        type: String, 
    },
    compony_name:{
        type:String,       
    },
    visit_time:{
        type:String,       
    },
    date:{
        type:String,       
    },
    user_name:{
        type:String
    }
  
})


const visitor = module.exports = mongoose.model('visitor',visitordetailSchema);

module.exports.createvisitor = function(newvdetail,callback){

    newvdetail.save(callback)
}

module.exports.UpdateVisitor= function(visitor, callback){
    console.log(visitor)

    visitor.findOne({p_id:visitor.p_id},
        {
            $set:
            {
                // "p_mobile_no": visitor.p_mobile_no,
                // "p_name":visitor.p_name,
                // "p_address":visitor.p_address,
                // "aadhar_no":visitor.aadhar_no,
                // "compony_name":visitor.compony_name,
                // "status":visitor.status,
                // "pincode":visitor.pincode,
                // "city":visitor.city,
                // "state":visitor.state,
                "email":visitor.email,
               
            }
        },
     callback
     )
    }  
//     {
//         $set:
//         {
//             "host_id": appoint.host_id,
//             "status":appoint.status,
//             "check_in":appoint.check_in,
//             "check_out":appoint.check_out,
//             "loc_sign_in":appoint.loc_sign_in,
//             "loc_Sign_out":appoint.loc_Sign_out,              
//         }
//     },
//  callback
//  )
// } 
module.exports.getVisitorById = function(id, callback){
  
  
    const query = {p_id: id}
    visitor.find(query,callback);

}

// getVisitorList
module.exports.getVisitorList = function(id, callback){  
    console.log(id)
    visitor.find(callback).skip(10*(id)).limit(10);

}
module.exports.getVisitorByMobno = function(id, callback){  
    console.log(id)
    visitor.find({p_mobile_no:id},callback);

}
module.exports.getLatestVisitorId = function( callback){  
  
    visitor.find(callback).limit(1).sort({$natural:1})
}