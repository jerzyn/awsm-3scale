/*jslint node: true */
'use strict';
var Q = require('q');
var parseString =require('xml2js').parseString;
var request = require('request');
var providerKey = process.env.PROVIDER_KEY;
var serviceID = process.env.SERVICE_ID;

exports.authenticate = function(user_key,callback) { // user_key comes from the query or header, method comes from path matching with hardcoded values
    var URL ='https://su1.3scale.net/transactions/authrep.xml?';
    URL += "provider_key="+providerKey;
    URL += "&service_id=" + serviceID;
    URL += "&user_key="+ user_key;

    promiseGet({url:URL})
    .then(function (response) {
      if(response.status && response.status.authorized[0] === 'true'){
        return callback(null,true); //return more details?
      }else{
        return callback(false); //return the error ?
      }
    })
    .done();
};

var parseXML = function(xml){
  var q = Q.defer();
  parseString(xml, function(err, res) {
    if (err) {
        q.reject(err);
    } else {
        q.resolve(res);
    }
  });
  return q.promise;
};

var promiseGet = function(params) {
    var q = Q.defer();
    request.get(params, function(err, response, body) {
      if (err) {
          q.reject(err);
      } else {
          q.resolve(parseXML(body));
      }
    });

    return q.promise;
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
