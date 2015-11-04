
//var threescale = require('3scale');
//var Promise = require('bluebird');

//var Client = threescale.Client;
//var client = new Client(process.env.PROVIDER_KEY);
var http = require('http');
var fetch = require('node-fetch');
fetch.Promise = require('bluebird');
var providerKey = process.env.PROVIDER_KEY;
var serviceID = process.env.SERVICE_ID;

exports.authenticate = function(user_key) { // user_key comes from the query or header, method comes from path matching with hardcoded values
   
// var options = {
//         'user_key': user_key,
//         'service_id': serviceID
//     };

    // http.get('http://su1.3scale.net/transactions/authrep.xml?provider_key=' + providerKey + '&user_key=' + user_key + '&service_id=' + serviceID, function(res) {
    //     console.log(res.statusCode);
    //     if (res.statusCode == 200) {
    //         callback(null,true);
    //     } else {
    //         callback(new Error('403, unauthorized'),null);
    //     }
    // });

    return fetch('http://su1.3scale.net/transactions/authrep.xml?provider_key=' + providerKey + '&user_key=' + user_key + '&service_id=' + serviceID)
        .then(function(res) {
            if (res.status == 200) {
                return true; //callback(null,true);
            } else {
                return false; //callback(new Error('403, unauthorized'),null);
            }
        });


    // client.authrep_with_user_key(options, function(res) {
    //     if (res.is_success()) {
    //         callback(null, res.is_success());
    //     } else {
    //         callback('403, unauthorized');
    //     }
    // });
};

/** 
* Lambda function to be used as an AWS API gateway endpoint handler. 
* Requires setting up the following Mapping Template: 
*   - Content-Type: application/json 
*   - Template: 
*       { 
*         "user_key": "$input.params('user_key')", 
*         "resourcePath": "$context.resourcePath", 
*         "httpMethod": "$context.httpMethod", 
*         "body": $input.json('$') 
*       } 
* */

