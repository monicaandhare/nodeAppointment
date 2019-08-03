const express = require('express');
const router = express.Router();
const visitor = require('../models/visitordetail');
const auto = require('../models/autobatch');
const authentication=require('./authentication.js')

router.post("/createvdetail",authentication,  (req, res,next) => {
    // auto.getNextSequenceValueVisitor( (err, response) => { 
        
    //     const result =  response.visitorid
    auto.findOneAndUpdate({_id: "Visitor" }, {$inc:{sequence_value:1}},{new:true},(err, response) => { 
        const result =  response.sequence_value
    let newvdetail = new visitor({
        p_id:result,
        p_mobile_no:req.body.p_mobile_no,
        p_name:req.body.p_name,
        p_address:req.body.p_address,
        aadhar_no:req.body.aadhar_no,
        compony_name:req.body.compony_name,
        vehicle_id:req.body.vehicle_id,
        state:req.body.state,
        pincode:req.body.pincode,
        email:req.body.email, 
        city:req.body.city,
        status:req.body.status,
        user_name:req.body.user_name,
        visit_time:req.body.visit_time,
        date:req.body.date,
    });
    
    visitor.createvisitor(newvdetail ,(err,user)=>{
        const p_id = user.p_id
        if(err){
            console.log(err)
            res.json({ success: false, msg: 'failed to registered visitor' });
        }
        else{
            res.json({ success: true, msg: ' visitor registered ',p_id });
        }
    })

});
});

router.post("/updatevisitor",authentication,(req,res,next)=>{
    let visitordetail = {
        p_id:req.body.p_id,
        p_mobile_no:req.body.p_mobile_no,
        p_name:req.body.p_name,
        p_address:req.body.p_address,
        aadhar_no:req.body.aadhar_no,
        compony_name:req.body.compony_name,
        vehicle_id:req.body.vehicle_id,
        city:req.body.city,
        pincode:req.body.pincode,
        state:req.body.state,
        email:req.body.email,
        status:req.body.status,
      
    }
  
    visitor.UpdateVisitor(visitordetail,(err,response)=>{
        if(err) {
            res.json({ success: false, msg: 'visitor not found'  });
        }
        else {
            res.json({ success: false,response});
            
        }     
             
    });	
});

router.get("/getvisitorbyid/:id",  (req, res,next) => {

 visitor.getVisitorById(req.params.id,(err,response)=>{
     
    if(err) {
        res.json({ success: false, msg: 'No not found'  });
    }
    else {
        res.json(response );
        
    }  
});
});	

router.get("/getvisitorlist/:id",  (req, res,next) => {

    visitor.getVisitorList(req.params.id,(err,response)=>{
       
        
       if(err) {
           res.json({ success: false, msg: 'No not found'  });
       }
       else {
           res.json(response );
           
       }  
   });
   });	

   router.get("/getvisitorbymobno/:id",  (req, res,next) => {

    visitor.getVisitorByMobno(req.params.id,(err,response)=>{
       
        
       if(err) {
           res.json({ success: false, msg: 'No not found'  });
       }
       else {   
           res.json(response );
           
       }  
   });
   });	


//    getLatestVisitorId

   
router.get("/getLatestVisitorId",  (req, res,next) => {

    visitor.getLatestVisitorId((err,response)=>{
       
        
       if(err) {
           res.json({ success: false, msg: 'No not found'  });
       }
       else {
           res.json({response });
           
       }  
   });
   });	
module.exports = router;