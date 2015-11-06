var http = require('http');
var fetch = require('node-fetch');
fetch.Promise = require('bluebird');
var providerKey = process.env.PROVIDER_KEY;
var serviceID = process.env.SERVICE_ID;

exports.authenticate = function(user_key) { // user_key comes from the query or header, method comes from path matching with hardcoded values

    return fetch('http://su1.3scale.net/transactions/authrep.xml?provider_key=' + providerKey + '&user_key=' + user_key + '&service_id=' + serviceID)
        .then(function(res) {
            if (res.status != 200) {
                return false;
            } else {
                return true;
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
