const express = require('express');
const router = express.Router();
const status = require('../models/status');
const auto = require('../models/autobatch.js');
const authentication=require('./authentication.js')


router.post("/addstatus", authentication, (req, res,next) => {
   
    auto.findOneAndUpdate({_id: "Status" }, {$inc:{sequence_value:1}},{new:true},(err, response) => { 
        const result =  response.sequence_value
        let newstatus = new status({
            status_id:result,
            status_name:req.body.status_name        
        });
    
    status.addstatus(newstatus ,(err,user)=>{
        if(err){
            console.log(err)
            res.json({ success: false, msg: 'failed to Add Status' });
        }
        else{
            res.json({ success: true, msg: 'Status Added ' });
        }
    })
    })
});


router.get("/getstatusbyid/:id",  (req, res,next) => {

    status.getStatusById(req.params.id,(err,response)=>{
     
    if(err) {
        res.json({ success: false, msg: 'Status not found'  });
    }
    else {
        res.json(response );
        
    }  
});
});	




router.get("/getstatuslist",  (req, res,next) => {

    status.getStatusList((err,response)=>{
       
        
       if(err) {
           res.json({ success: false, msg: 'No not found'  });
       }
       else {
           res.json(response );    
       }  
   });
   });	


module.exports = router;