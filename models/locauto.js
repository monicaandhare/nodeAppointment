const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const autuschema = mongoose.Schema({
   
    sequence_value:{
        type:Number,
    },
    _id:{
        type:String,
    },
  

});



const auto = module.exports = mongoose.model('locauto',autuschema);

module.exports.getNextSequenceValue= function(callback){
// function {
  

  auto.findOneAndUpdate({_id: "AutoID" },
        {$inc:{sequence_value:1}}, {new:true},callback);
   
     
   
 }

//  const autuappoint = mongoose.Schema({
   
//     sequence_value:{
//         type:Number,
//     },
//     _id:{
//         type:String,
//     },
  

// });


// const autoappoint = module.exports = mongoose.model('autoappoint',autuappoint);

// module.exports.getNextSequenceValueAppoint= function(callback){
// // function {
  

//     autoappoint.findOneAndUpdate({_id: "AutoID" },
//         {$inc:{sequence_value:1}}, {new:true},callback);
   
     
   
//  }
