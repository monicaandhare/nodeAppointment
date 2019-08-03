const express = require('express');
const router = express.Router();
const assign = require('../models/assign.js');
const auto = require('../models/autobatch');
const authentication = require('./authentication.js')


router.post("/addassign",authentication, (req, res, next) => {
    // auto.getNextSequenceValueforassign((err, response) => {
    //     console.log(response.sequence_value)
    //     const result = response.sequence_value

    auto.findOneAndUpdate({_id: "Assign" }, {$inc:{sequence_value:1}},{new:true},(err, response) => { 
        const result =  response.sequence_value

        let newassign = new assign({
            assign_id: result,
            bin_code: req.body.bin_code,
            mat_code: req.body.mat_code,
            capacity: req.body.capacity
            // material:req.body.material,  
        });


        console.log(newassign)

        // assign.
        assign.addassign(newassign, (err, user) => {
            if (err) {
                console.log(err)
                res.json({ success: false, msg: 'failed to registered appointment' });
            }
            else {
                res.json({ success: true, msg: ' Appointment registered ' });
            }
        })
    })
});


router.get("/getassignbyid/:id", (req, res, next) => {

    assign.getassignById(req.params.id, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'Not found'});
        }
        else {
            res.json(response);
        }
    });
});


router.get("/getassignlistbybincode/:id", (req, res, next) => {

    assign.getassignlistbyBincode(req.params.id, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});



module.exports = router;