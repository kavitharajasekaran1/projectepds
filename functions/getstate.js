var bcSdk = require('../fabcar/query');

//const user = require('../models/fetchdata');

       
        exports.getstate = (key) => {
            return new Promise((resolve, reject) => {
                console.log("entering into readRequest function.......!")
                
                bcSdk.getstate({
                    key: key 
                })
        
                .then((requestarray) => {
                    console.log("data in requestArray " + requestarray)
        
                    return resolve({
                        status: 200,
                        query: requestarray
                    })
                })
        
                .catch(err => {
        
                    if (err.code == 401) {
        
                        return reject({
                            status: 401,
                            message: 'cant fetch !'
                        });
        
                    } else {
                        console.log("error occurred" + err);
        
                        return reject({
                            status: 500,
                            message: 'Internal Server Error !'
                        });
                    }
                })
            })
        };