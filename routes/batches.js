const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const batch = require('../models/batch');
const auto = require('../models/autobatch');
const authentication = require('./authentication.js')



router.post("/updatebatch",authentication,  (req, res,next) => {
    console.log(req.body)
    let batchdata = {
        batch_id:req.body.batch_id,
        batchItems:req.body.batchItems
    };
    
    batch.updateBatch(batchdata ,(err,user)=>{
        if(err){
            res.json({ success: false, msg: 'failed to Update Appontment' });
        }
        else{    
            res.json({ success: true, msg: 'Update Batch' });
           
        }
    })

})






router.post("/addbatch",authentication,  (req, res,next) => {
    // console.log(req.body)
    // auto.getNextSequenceValue( (err, response) => {
    //     console.log(response.sequence_value)
    //     const result =  response.sequence_value

    auto.findOneAndUpdate({_id: "Batch" }, {$inc:{sequence_value:1}},{new:true},(err, response) => { 
        const result =  response.sequence_value
    let newbatch = new batch({
        batch_id:result,
        // batch_id:req.body.batch_id,
        batchItems:req.body.batchItems,
    });
    console.log(newbatch)
    
    batch.addBatch(newbatch ,(err,user)=>{
        console.log(user)
        const result = user.batch_id
        if(err){
            // auto.findOneAndUpdate({_id: "Batch" }, {$dec:{sequence_value:1}},{new:true})
            console.log(err)
            res.json({ success: false, msg: 'failed to Generate Batch' });
        }
        else{
            res.json({ success: true, msg: ' Batch generated ' ,result});
        }
    })

});
});


router.get("/getbatchbyid/:id",  (req, res,next) => {

    batch.getBatchById(req.params.id,(err,response)=>{
     
    if(err) {
        res.json({success: false, msg: 'Batch Not found'});
    }
    else {
        res.json(response );
        
    }  
});
});	




router.get("/getbatchlist/:id",  (req, res,next) => {

    batch.getBatchList(req.params.id,(err,response)=>{
       
        
       if(err) {
           res.json({ success: false, msg: 'No not found'  });
       }
       else {
           res.json(response );    
       }  
   });
   });	


module.exports = router;