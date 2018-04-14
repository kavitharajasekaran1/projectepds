let multichain = require("multichain-node")({
    port:  4381,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "HZwG5H5Ak6z2ZgqyQaKh7cdX72pzP4ZtLAw6VyVCRxqG"       
});
function savetransaction(params) {
   
    return new Promise((resolve) => {
        var response;

      var TransactionDetails = params.Transactiondetails.transactionstring;
      var policyNumber= params.Transactiondetails.key;
    console.log("TransactionDetails",params.Transactiondetails.transactionstring)
    console.log("TransactionDetailsssss",params.Transactiondetails.key)

    var hex = '';
    for(var i=0;i<TransactionDetails.length;i++) {
        hex += ''+TransactionDetails.charCodeAt(i).toString(16);
    }
    console.log("hex",hex);
    
    multichain.publish({key: policyNumber,transactionstring: hex }, (err, res) => {
        console.log("response",res)
        if(err == null){
         return resolve({response:res});
        }else{
            console.log(err)
        }
    })

})
   
}
 module.exports = {
	savetransaction: savetransaction
	
 
 };