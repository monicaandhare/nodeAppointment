const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const appointment = require('../models/appointment');
const auto = require('../models/autobatch');
const authentication = require('./authentication.js')

router.post("/addappointment",authentication, (req, res, next) => {
    console.log(req.body)
    // auto.getNextSequenceValueAppoint( (err, response) => { 
    //     console.log(response.sequence_value)
    //     const result =  response.sequence_value
    auto.findOneAndUpdate({ _id: "Appointment" }, { $inc: { sequence_value: 1 } }, { new: true }, (err, response) => {
        const result = response.sequence_value
        let newappoint = new appointment({
            appont_id: result,
            vehicle_id: req.body.vehicle_id,
            host_id: req.body.host_id,
            date: req.body.date,
            purpose: req.body.purpose,
            appoint_time: req.body.appoint_time,
            p_id: req.body.p_id,
            status: req.body.status,
            check_in: req.body.check_in,
            check_out: req.body.check_out,
            location: req.body.location,
            batch_id: req.body.batch_id,
            appoint_cat: req.body.appoint_cat,
            username: req.body.username
        });


        appointment.addAppointment(newappoint, (err, user) => {
            console.log(user)
            if (err) {
                // auto.findOneAndUpdate({_id: "Appointment" }, {$dec:{sequence_value:1}},{new:true})
                console.log(err)
                res.json({ success: false, msg: 'failed to registered appointment' });
            }
            else {
                res.json({ success: true, msg: ' Appointment registered ' });
            }
        })

    });
});


router.get("/getappointmentbyid/:id", (req, res, next) => {

    appointment.getAppointById(req.params.id, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});


router.get("/getappointmentbybatchid/:id", (req, res, next) => {

    appointment.getAppointByBatchId(req.params.id, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'not found' });
        }
        else {
            res.json(response);

        }
    });
});







router.get("/getbatchbyappointmentid/:id", (req, res, next) => {
    console.log(req.params.id)

    appointment.GetBatchByAppointmentId(req.params.id, (err, response) => {

        if (err) {
            console.log(err)
            res.json({ success: false, msg: 'Batch not found' });
        }
        else {
            res.json(response);

        }
    });
})
router.get("/getappforsap/:id", (req, res, next) => {
    console.log(req.params.id)

    appointment.getAppointmentdetailsById(req.params.id, (err, response) => {

        if (err) {
            console.log(err)
            res.json({ success: false, msg: 'Appointment not found' });
        }
        else {
            res.json(response);

        }
    });
})




router.get("/getappointmentlist/:id", (req, res, next) => {

    appointment.getAppointmentList(req.params.id, (err, response) => {


        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);
        }
    });
});

router.get("/findappointmentbypid/:id/:date/:status", (req, res, next) => {

    appointment.findAppointmentByPId(req.params.id, req.params.date, req.params.status, (err, response) => {


        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});



//    findAppointmentByPId

router.post("/updateappointment", authentication,(req, res, next) => {
    console.log(req.body)

    let appoint = {
        appont_id: req.body.appont_id,
        // vehicle_id:req.body.vehicle_id,
        // host_id:req.body.host_id,
        // date:req.body.date,
        // appoint_time:req.body.appoint_time,
        // p_id:req.body.p_id,
        status: req.body.status,
        // location:req.body.location,
        batch_id: req.body.batch_id,
        check_in: req.body.check_in,
        check_out: req.body.check_out
    };

    appointment.updateAppointment(appoint, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'failed to Update Appontment' });
        }
        else {
            if (appoint.location != undefined) {
                appointment.updateLocation(appoint, (err, user) => {
                    if (err) {
                        res.json({ success: false, msg: 'failed to Update Appontment' });
                    }
                    else {
                        res.json({ success: true, msg: ' Appointment Update ', user });
                    }
                })
            }
            else {
                res.json({ success: true, msg: ' Appointment Update ', user });
            }



        }
    })

});

router.get("/getlatestappointmentid", (req, res, next) => {

    appointment.getLatestAppointmentId((err, response) => {


        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json({ response });

        }
    });
});



router.get("/getappointlistbydate/:id/:status", (req, res, next) => {

    appointment.getAppointListByDate(req.params.id, req.params.status, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});
router.get("/getappointlistbydateandcat/:id/:cat", (req, res, next) => {

    appointment.getAppointListBydateandCat(req.params.id, req.params.cat, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});


router.get("/getappointlistbydatestatus/:id/:status", (req, res, next) => {

    appointment.getAppointListBystatusDate(req.params.id, req.params.status, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});
// appointment.getAppointListByDate(req.params.id,req.params.status,(err,response)=>{

router.get("/getappointcountbydate/:id", (req, res, next) => {

    appointment.getAppointCountByDate(req.params.id, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});


router.get("/findappointbystatus/:id", (req, res, next) => {

    appointment.getAppointByStatus(req.params.id, (err, response) => {


        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});

router.get("/findappointbystadate/:id/:date", (req, res, next) => {

    appointment.getAppointByStatusDate(req.params.id, req.params.date, (err, response) => {


        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});

router.get("/getappointcountbydatestatus/:id/:date", (req, res, next) => {

    appointment.getAppointCountByDatestatus(req.params.id, req.params.date, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});
router.get("/getappointcountbydsc/:date/:id/:cat", (req, res, next) => {

    appointment.getAppointCountByDatestatuscat(req.params.id, req.params.date,req.params.cat, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});
router.get("/getappointlistbydsc/:date/:id/:cat", (req, res, next) => {
    console.log(req.params.cat)

    appointment.getAppointlistByDatestatuscat(req.params.id, req.params.date,req.params.cat, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});

router.get("/getappointbypid/:id", (req, res, next) => {

    appointment.getAppointByPID(req.params.id, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});
module.exports = router;