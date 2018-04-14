'use strict';
// const bc_client = require('../blockchain_sample_client'); const bcrypt =
// require('bcryptjs');
var bcSdk = require('../fabcar/invoke.js');

exports.state = (transactionstring) => new Promise((resolve, reject) => {
   
   const transactiondetails = ({
    transactionstring:transactionstring
   });
   console.log("transactiondetails");
   console.log("Value received");
   bcSdk
       .savetransaction({
           
           Transactiondetails: transactiondetails
          
       })
       
       .then((result) => resolve({
           status: 201,
           response:result.response,
           message: 'Commandities allocated Sucessfully !'
       }))
       .catch(err => {
           if (err.code == 11000) {
               reject({
                   status: 409,
                   message: 'some error !'
               });
           } else {
               console.log("error occurred" + err);
               reject({
                   status: 500,
                   message: 'Internal Server Error !'
               });
           }
       });
});