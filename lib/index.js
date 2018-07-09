const assert = require('assert');
const { errJson, errJsonDebug } = require('err-json');
const { error } = require('lambda-console');
const { callbackify } = require('lambda-callbackify');

exports.defaultErrorResponse = defaultErrorResponse;

exports.errorhandler = (options = {}) => {
  const {
    renderError = defaultErrorResponse,
  } = options;

  assert(typeof(renderError) === 'function', 'options.renderError must be a function');

  return next => {
    next = callbackify(next);

    return (event, context, callback) => {
      next(event, context, (err, result) => {
        if (!err) {
          return callback(null, result);
        }

        renderError(err, event, context, callback);
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
