const express = require('express');
const router = express.Router();
const user = require('../models/user');
const auto = require('../models/autobatch');
const jwt = require('jsonwebtoken');
const authentication = require('./authentication')

router.post("/adduser",authentication,(req, res, next) => {

    auto.findOneAndUpdate({ _id: "User" }, { $inc: { sequence_value: 1 } }, { new: true }, (err, response) => {
        const result = response.sequence_value
        let newuser = new user({
            user_id: req.body.user_id,
            username: req.body.username,
            password: req.body.password,
            branch: req.body.branch,
            user_role_id: req.body.user_role_id,
            person_id: req.body.person_id,
            enabled: req.body.enabled,
            app_list: req.body.app_list,
            branch_list: req.body.branch_list,
            device_id: req.body.device_id,
        });

        user.addUser(newuser, (err, user) => {
            if (err) {
                console.log(err)
                res.json({ success: false, msg: 'failed to Create User' });
            }
            else {
                res.json({ success: true, msg: ' User Created ' });
            }
        })
    })
});


router.get("/logout", authentication, (req, res, next) => { });



router.post("/loginCheck", (req, res, next) => {
    console.log("BODY", req.body)
    let logindata = {
        username: req.body.username,
        password: req.body.password,
    };

    user.findUserByUnamePassword(logindata, (err, user) => {

        console.log("USER", user)
        if (err) {
            res.json({ success: false, msg: 'Not Authenticated User' });
        }
        else {
            if (user.length == 0) {
                console.log("blank")
                res.json({ success: false, msg: 'Uname Password did not match' });
            }
            else {
                jwt.sign({ user }, 'AUTHHEADER', { expiresIn: 60 }, (err, token) => {
                    res.json({ user, token: token });
                });
            }
            // res.json(user);    
        }
    });
});

router.get("/getuserbyid/:id", (req, res, next) => {

    user.getUserById(req.params.id, (err, response) => {

        if (err) {
            res.json({ success: false, msg: 'No not found' });
        }
        else {
            res.json(response);

        }
    });
});


router.get("/getuserlist/:id", (req, res, next) => {

    user.getUserList(req.params.id, (err, response) => {


        if (err) {
            res.json({ success: false, msg: 'User not found' });
        }
        else {
            res.json(response);
        }
    });
});

module.exports = router;