const express = require('express');
const router = express.Router();
const bin = require('../models/bins');
const authentication = require('./authentication.js')


router.post("/addbin",authentication,  (req, res,next) => {
    let newbin = new bin({
        bin_code:req.body.bin_code,
        bin_details:req.body.bin_details,
        // material:req.body.material,
        
    });
    
    bin.addbin(newbin ,(err,user)=>{
        if(err){
            console.log(err)
            res.json({ success: false, msg: 'failed to Add Bin' });
        }
        else{
            res.json({ success: true, msg: 'Bin Added ' });
        }
    })

});


router.get("/getbinbyid/:id",  (req, res,next) => {

    bin.getBinById(req.params.id,(err,response)=>{
     
    if(err) {
        res.json({ success: false, msg: 'list not found'  });
    }
    else {
        res.json(response );
        
    }  
});
});	




router.get("/getbinlist/:id",  (req, res,next) => {

    bin.getbinList(req.params.id,(err,response)=>{
       
        
       if(err) {
           res.json({ success: false, msg: 'No not found'  });
       }
       else {
           res.json(response );    
       }  
   });
   });	


module.exports = router;