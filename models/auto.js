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



const auto = module.exports = mongoose.model('auto',autuschema);

module.exports.getNextSequenceValue= function(callback){
// function {
  

  auto.findOneAndUpdate({_id: "AutoID" },
        {$inc:{sequence_value:1}}, {new:true},callback);
   
     
   
 }

 const autuappoint = mongoose.Schema({
   
    sequence_value:{
        type:Number,
    },
    _id:{
        type:String,
    },
    visitorid:{
        type:Number,
    },
  

});


const autoappoint = module.exports = mongoose.model('autoappoint',autuappoint);

module.exports.getNextSequenceValueAppoint= function(callback){
// function {

    autoappoint.findOneAndUpdate({_id: "AutoID" },
        {$inc:{sequence_value:1}}, {new:true},callback);
 }

 module.exports.getNextSequenceValueVisitor= function(callback){
    // function {
    
        autoappoint.findOneAndUpdate({_id: "AutoID" },
            {$inc:{visitorid:100}}, {new:true},callback);
     }

 const visitors = mongoose.Schema({
   
    sequence_value:{
        type:Number,
    },
    _id:{
        type:String,
    },
  

});


// const autuvisitors = module.exports = mongoose.model('autuvisitor',visitors);

// module.exports.getNextSequenceValueVisitor= function(callback){
// // function {
  

//     autuvisitors.findOneAndUpdate({_id: "AutoID" },
//         {$inc:{sequence_value:1}}, {new:true},callback);
   
     
   
//  }

