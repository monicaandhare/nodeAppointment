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



const auto = module.exports = mongoose.model('autobatch',autuschema);

module.exports.getNextSequenceValue= function(callback){
  auto.findOneAndUpdate({_id: "AutoID" },
        {$inc:{sequence_value:1}}, {new:true},callback);  
 }

 module.exports.getNextSequenceValueforassign= function(callback){
    auto.findOneAndUpdate({_id: "Assign" },
          {$inc:{sequence_value:1}}, {new:true},callback);  
   }