const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const batchschema = mongoose.Schema({
    batch_id: {
        type: Number,
        required: true,
         unique: true 
    },

    batchItems:[
        {
        bin_code:{type:String},
        no_of_beans:{type:Number},
        assign_id:{type:Number},
        // mat_id:{type:String},
        total_qty:{type:String}
        }
    ]  
})


const batch = module.exports = mongoose.model('batch',batchschema);


module.exports.updateBatch = function (batchdata, callback) {
    console.log(batchdata)
    batch.updateOne({ batch_id: batchdata.batch_id },
        {
            $set:
            {
                "batchItems": batchdata.batchItems,
            }
        },
        callback
    )
}




module.exports.addBatch = function(batch,callback){
    console.log(batch)
    batch.save(callback)
}


module.exports.getBatchById = function(id, callback){
    const query = {batch_id: id}
    batch.find(query,callback);
}

module.exports.getBatchList = function(pageno,callback){
    batch.find( callback).skip(50*(pageno-1)).limit(50).sort({$natural:-1})
   
}

