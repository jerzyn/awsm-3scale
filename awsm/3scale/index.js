'use-strict';
/**
 * AWS Module: Action: Modularized Code
 */
 var threescale = require('awsm-3scale').authenticate;

// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  return cb(null, action(event, context));
};

function getMethodName(path, method) {
    if (!path || !method) return 'hits';
    var pathFrag = path.replace(/^\/|\/$/g, '').replace(/\//g, '_');
    return pathFrag + '_' + method;
};

var action = function(event, context) {
	var method = getMethodName(event.resourcePath, event.httpMethod);
	if (event.user_key) {
    threescale.authenticate(event.user_key, method, function(err, res) {
      if (err) {
          context.fail(err);
      } else {
          context.succeed(true);
      }
    });
	} else {
	  context.fail('user_key missing');
	}
};
