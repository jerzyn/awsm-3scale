'use-strict';

var threescale = require('3scale');
//var Promise = require('bluebird');

var Client = threescale.Client;
var client = new Client(process.env.PROVIDER_KEY);
var serviceID = process.env.SERVICE_ID;

exports.authenticate = function(user_key, method, callback) { // user_key comes from the query or header, method comes from path matching with hardcoded values
    var options = {
        'user_key': user_key,
        'usage': {},
        'service_id': serviceID
    };
    options['usage'][method] = 1;
    client.authrep_with_user_key(options, function(res) {
        if (res.is_success()) {
            callback(null, res.is_success());
        } else {
            callback('403, unauthorized');
        }
    });
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

