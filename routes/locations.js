const express = require('express');
const router = express.Router();
const location = require('../models/location');
const locauto = require('../models/locauto');
const authentication = require('./authentication.js')


router.post("/addlocation",authentication, (req, res,next) => {
    auto.findOneAndUpdate({_id: "Location" }, {$inc:{sequence_value:1}},{new:true},(err, response) => { 
        const result =  response.sequence_value
    let newlocation = new location({
        loc_id:result,
        loc_name:req.body.loc_name,
        loc_incharge:req.body.loc_incharge,
        description:req.body.description,
        username:req.body.username,
        
    });
    
    location.addLocation(newlocation ,(err,user)=>{
        if(err){
            console.log(err)
            res.json({ success: false, msg: 'failed to add location' });
        }
        else{
            res.json({ success: true, msg: ' Location Add ' });
        }
    })
    })

});


router.get("/getlocationbyid/:id",  (req, res,next) => {

    location.locationById(req.params.id,(err,response)=>{
     
    if(err) {
        res.json({ success: false, msg: 'No not found'  });
    }
    else {
        res.json(response );
        
    }  
});
});	




router.get("/getlocationist/:id",  (req, res,next) => {

    location.getLocationList(req.params.id,(err,response)=>{
       

       if(err) {
           res.json({ success: false, msg: 'No not found'  });
       }
       else {
           res.json(response );    
       }  
   });
   });	


module.exports = router;