'use-strict';
/**
 * AWS Module: Action: Modularized Code
 */
 var threescale = require('awsm-3scale').authenticate;

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  return cb(null, action(event, context));
};

var action = function(event, context) {
  if (threescale.authenticate(event.user_key)) {
      context.succeed({"question": pickAQuestion(), "answer": pickAnAnswer()});
    } else {
      context.fail('403, unauthorized');
    }
};
