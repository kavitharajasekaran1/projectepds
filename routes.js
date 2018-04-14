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
 




  


  

const registerUser = require('./functions/registerUser');
const login = require('./functions/login');
const central = require('./functions/central');
const state = require('./functions/state');
const FPS =require ('./functions/FPS');
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
            console.log("result//",result); 
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








router.post('/central', cors(), (req, res) => { 
    const key ="001"
    const rice = req.body.rice;
    console.log(rice);
    const wheat = req.body.wheat;
    console.log(wheat);
     


    const kerocene = req.body.kerocene;
    console.log(kerocene);
    const date = req.body.date;
    console.log(date);
    const state = req.body.state;
    console.log(state);
    const rices = req.body.rices;
    console.log(rices);
    const wheats = req.body.wheats;
    console.log(wheats);
    const kerocenes = req.body.kerocenes;
    console.log(kerocenes);
    const transactionstring = ({
        rice:rice,
        wheat:wheat,
        kerocene:kerocene,
        date:date,
        state:state,
        rices:rices,
        wheats:wheats,
        kerocenes:kerocenes
        
    });
    console.log(transactionstring)
    if (!rice || !wheat || !kerocene || !date || !state || !rices || !wheats|| !kerocenes ) {

        res
            .status(400)
            .json({
                message: 'Invalid Request !'
            });

    } else {

        central
            .central(transactionstring,key)
            .then(result => {

                res.send({
                    "message": "Commandities allocated",
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
}


router.get('/getstate', cors(), (req, res) => {
         
                     const key = req.body.key;
                     console.log("requestid1", key);
                  
         
         
                     getstate.getstate(key)
                     .then(function(result) {
                         console.log("requestid1",key)
                           return res.json({
                              "status":200,
                              "message": result.query
                          });
                      })
                      .catch(err => res.status(err.status).json({
                          message: err.message
                      }));
           
              
             });





router.post('/state', cors(), (req, res) => { 

    const rice = req.body.rice;
    console.log(rice);
    const wheat = req.body.wheat;
    console.log(wheat);
 


    const kerocene = req.body.kerocene;
    console.log(kerocene);
    const date = req.body.date;
    console.log(date);
    const rices = req.body.rices;
    console.log(rices);
    const wheats = req.body.wheats;
    console.log(wheats);
    const kerocenes = req.body.kerocenes;
    console.log(kerocenes);
    const transaction = ({
        rice:rice,
        wheat:wheat,
        kerocene:kerocene,
        date:date,
        district:district,
        rices:rices,
        wheats:wheats,
        kerocenes:kerocenes
        
    });
    console.log(transactionstring)
    if (!rice || !wheat || !kerocene || !date || !district || !rices || !wheats|| !kerocenes ) {

        res
            .status(400)
            .json({
                message: 'Invalid Request !'
            });

    } else {

        state
            .central(transactionstring)
            .then(result => {

                res.send({
                    "message": "Commandities Given",
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






router.post('/FPS', cors(), (req, res) => { 

    const rice = req.body.rice;
    console.log(rice);
    const wheat = req.body.wheat;
    console.log(wheat);



    const kerocene = req.body.kerocene;
    console.log(kerocene);
    const date = req.body.date;
    console.log(date);
    
    const transactionstring = ({
        rice:rice,
        wheat:wheat,
        kerocene:kerocene,
        date:date,
        rices:rices,
        wheats:wheats,
        kerocenes:kerocenes
        
    });
    console.log(transactionstring)
    if (!rice || !wheat || !kerocene || !date ) {

        res
            .status(400)
            .json({
                message: 'Invalid Request !'
            });

    } else {

        state
            .central(transactionstring)
            .then(result => {

                res.send({
                    "message": "Goods distributed",
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