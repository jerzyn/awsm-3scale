'use-strict';
/**
 * AWS Module: Action: Modularized Code
 */

var threescale = require('awsm-3scale').threescale;


// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  console.log(threescale);

  threescale.authenticate(event.user_key,function(err,res){
    console.log(err,res);
    if(res){
      context.succeed({"message":"hello world"});
    } else {
      context.fail('403, unauthorized');
    }
  });
};
