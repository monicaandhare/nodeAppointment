const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const vehicle = require('../models/vehicle');
const auto = require('../models/autobatch');
const authentication=require('./authentication.js')


router.post("/addvehicle", authentication, (req, res,next) => {

    auto.findOneAndUpdate({_id:"Vehicle"}, {$inc:{sequence_value:1}},{new:true},(err, response) => { 
        const result =  response.sequence_value


    let newvehicle = new vehicle({
        vehicle_id:result,
        vehicle_no:req.body.vehicle_no,
        vehicle_name:req.body.vehicle_name,
        driver_name:req.body.driver_name,
        licene_no:req.body.licene_no,
        tranp_name:req.body.tranp_name,
        user_name:req.body.user_name
    });
    
    vehicle.addvehicle(newvehicle ,(err,user)=>{
        const vehicle_id = user.vehicle_id
        console.log(err)
        if(err){
            res.json({ success: false, msg: 'failed to Add Vehicle' });
        }
        else{
          
            res.json({ success: true, msg: ' Vehicle Add Successfullyy ',vehicle_id });
       
        
        }
    })
    })
});


router.get("/getvehiclebyid/:id",  (req, res,next) => {

    vehicle.getVehicleById(req.params.id,(err,response)=>{
     
    if(err) {
        res.json({ success: false, msg: 'No not found'  });
    }
    
    else {

        res.json(response );
        
    }  
});
});	


router.get("/getlatestid",  (req, res,next) => {

    vehicle.getLatestId((err,response)=>{
       
        
       if(err) {
           res.json({ success: false, msg: 'No not found'  });
       }
       else {
           res.json(response );
           
       }  
   });
   });	

//    getLatestId

router.get("/getvehiclelist/:id",  (req, res,next) => {

    vehicle.getVehicleList(req.params.id,(err,response)=>{
       
        
       if(err) {
           res.json({ success: false, msg: 'No not found'  });
       }
       else {
           res.json(response );
           
       }  
   });
   });

   router.get("/getvehiclebyvehno/:id",  (req, res,next) => {

    vehicle.getVehicleByVehNo(req.params.id,(err,response)=>{
       
        
       if(err) {
           res.json({ success: false, msg: 'No not found'  });
       }
       else {   
           res.json(response );
           
       }  
   });
   });	

module.exports = router;