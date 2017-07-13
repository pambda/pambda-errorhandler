const assert = require('assert');
const { errJson, errJsonDebug } = require('err-json');
const { error } = require('lambda-console');

exports.defaultErrorResponse = defaultErrorResponse;

exports.errorhandler = (options = {}) => {
  const {
    renderError = defaultErrorResponse,
  } = options;

  assert(typeof(renderError) === 'function', 'options.renderError must be a function');

  return next => (event, context, callback) => {
    next(event, context, (err, result) => {
      if (!err) {
        return callback(null, result);
      }

      renderError(err, event, context, callback);
    });
  };
};

function defaultErrorResponse(err, event, context, callback) {
  error({
    event,
    err: errJsonDebug(err, true),
  });

  callback(null, {
    statusCode: 500,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: errJson(err),
  });
}
