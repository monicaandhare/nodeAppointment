const express = require('express');
const router = express.Router();
const user = require('../models/userrole');
const authentication =require('./authentication.js')

router.post("/adduser",authentication,  (req, res,next) => {
    let newuser = new userrole({
        user_id:req.body.user_id,
        username:req.body.username,
        password:req.body.password,
        user_role_id:req.body.user_role_id,
        employee_id:req.body.employee_id,
        
    });
    
    user.addUser(newuser ,(err,user)=>{
        if(err){
            console.log(err)
            res.json({ success: false, msg: 'failed to Create User' });
        }
        else{   
            res.json({ success: true, msg: ' User Created ' });
        }
    })

});


router.get("/getuserbyid/:id",  (req, res,next) => {

    user.getUserById(req.params.id,(err,response)=>{
     
    if(err) {
        res.json({ success: false, msg: 'No not found'  });
    }
    else {
        res.json(response );
        
    }  
});
});	




router.get("/getuserlist/:id",  (req, res,next) => {

    user.getUserList(req.params.id,(err,response)=>{
       
        
       if(err) {
           res.json({ success: false, msg: 'User not found'  });
       }
       else {
           res.json(response );    
       }  
   });
   });	
   


module.exports = router;