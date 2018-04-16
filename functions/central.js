'use strict';
// const bc_client = require('../blockchain_sample_client'); const bcrypt =
// require('bcryptjs');
var bcSdk = require('../fabcar/invoke.js');

exports.central = (transactionstring,key) => new Promise((resolve, reject) => {
    console.log("chennai",transactionstring)
   const transactiondetails = ({
    transactionstring:transactionstring,
    key:key
   });
   console.log("vijay",transactiondetails)
   console.log("ENTERING THE CORE MODULE");
   bcSdk
       .savetransaction({
           
           Transactiondetails: transactiondetails,
         
           
       })
       console.log("result123",result)
    
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