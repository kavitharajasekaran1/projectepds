// This is just a sample script. Paste your real code (javascript or HTML) here.
// here only routing is done and if the ro
'use strict';


var request = require('request');

var Promises = require('promise');
const date = require('date-and-time');
const Nexmo = require('nexmo');
var mongoose = require('mongoose');


var path = require('path');
var cors = require('cors');
var cloudinary = require('cloudinary');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
const log4js = require('./log4js-node/lib/log4js');
log4js.configure({
    appenders: { readypolicy: { type: 'file', filename: 'readypolicy.log' } },
    categories: { default: { appenders: ['readypolicy'], level: 'error' } }
  });





  


  


// This is just a sample script. Paste your real code (javascript or HTML) here.
// here only routing is done and if the ro


const registerUser = require('./functions/registerUser');
const login = require('./functions/login');
module.exports = router => { 


    router.post('/registerUser', cors(), (req, res) => { 

        const firstname = req.body.firstname;
        console.log(firstname);
        const lastname = req.body.lastname;
        console.log(lastname);
        const phonenumber = parseInt(req.body.phonenumber);
        console.log(phonenumber);
        const email = req.body.email;
        console.log(email);
        const password = req.body.password;
        console.log(password);
        const retypepassword = req.body.retypepassword;
        console.log(retypepassword);
        const usertype = req.body.usertype;
        console.log(usertype);
        if (!firstname || !lastname || !phonenumber || !email || !password || !retypepassword || !usertype) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            registerUser
                .registerUser(firstname, lastname, phonenumber,email,password, retypepassword,usertype)
                .then(result => {

                    res.send({
                        "message": "user has been registered successfully",
                        "status": true,


                    });


                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
        }
    });
router.post('/login', cors(), (req, res) => {
    console.log("entering login function in functions ");
    const emailid = req.body.email;
    console.log(emailid);
    const passwordid = req.body.password;
    console.log(passwordid);
   
   
    login
        .loginUser(emailid, passwordid)
        .then(result => {  
            console.log("resultharini",result); 
            console.log("result ===>>>",result.users.usertype)
            


            res.send({
                "message": "Login Successful",
                "status": true,
          
            });
        })
        .catch(err => res.status(err.status).json({
            message: err.message
        }).json({
            status: err.status
        }));

});

}