const assert = require('assert');
const { errJson, errJsonDebug } = require('err-json');
const { error } = require('lambda-console');
const { callbackify } = require('lambda-callbackify');

exports.defaultErrorResponse = defaultErrorResponse;

exports.errorhandler = (options = {}) => {
  const {
    renderError = defaultErrorResponse,
    errorNotificationArn = process.env.ERROR_NOTIFICATION_ARN,
  } = options;

  assert(typeof(renderError) === 'function', 'options.renderError must be a function');

  return next => {
    next = callbackify(next);

    return (event, context, callback) => {
      next(event, context, (originalErr, result) => {
        if (!originalErr) {
          return callback(null, result);
        }

        if (errorNotificationArn) {
          const sns = getSns(context);
          if (sns) {
            /*
             * Replace a callback for publishing an error message to SNS.
             */
            const originalCallback = callback;
            callback = (err, result) => {
              const params = {
                TopicArn: errorNotificationArn,
                Subject: originalErr.message,
                Message: JSON.stringify(errJsonDebug(originalErr, true)),
              };

              sns.publish(params, (snsErr, _) => {
                if (snsErr) {
                  error({
                    err: errJsonDebug(snsErr, true),
                  });
                }

                originalCallback(err, result);
              });
            };
          }
        }

        renderError(originalErr, event, context, callback);
      });
    };
  };
};

function defaultErrorResponse(err, event, context, callback) {
  error({
    event,
    err: errJsonDebug(err, true),
  });

  const body = process.env.AWS_SAM_LOCAL === 'true'
    ? errJsonDebug(err, true) : errJson(err);

  callback(null, {
    statusCode: 500,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body, null, 2),
  });
}

function getSns(context) {
  let sns = context.SNS;

  if (sns) {
    return sns;
  }

  let AWS;

  try {
    AWS = require('aws-sdk');
  } catch (err) {
    return;
  }

  return new AWS.SNS();
}
