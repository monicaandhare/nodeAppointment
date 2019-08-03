const express = require('express');
const router = express.Router();
const material = require('../models/material');
const jwt = require('jsonwebtoken');
const authentication = require('./authentication')

router.post("/addmaterial",authentication,  (req, res,next) => {

    
    let newmaterial = new material({
        mat_code:req.body.mat_code,
        mat_capacity:req.body.mat_name,
        // material:req.body.material   
    });
    
    material.addMaterial(newmaterial,(err,user)=>{
        if(err){
            console.log("BODYYYYYYY",newmaterial,err)
            res.json({ success: false, msg: 'failed to Add Material' });
        }
        else{
           res.json({ success: true, msg: 'Material added' });
            
        }
    })

});


router.get("/getmaterialbyid/:id",  (req, res,next) => {

    material.getMaterialById(req.params.id,(err,response)=>{
     
    if(err) {
        res.json({ success: false, msg: 'No not found'  });
    }
    else {

          res.json(response );
        
    }  
});
});	




router.get("/getmateriallist/:id",  (req, res,next) => {
    material.getMaterialList(req.params.id,(err,response)=>{
               
      if(err) {
          res.json({ success: false, msg: 'No not found'  });
      }
      else {
             res.json(response );    
      }  
   });
  });	


module.exports = router;