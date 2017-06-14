const assert = require('assert');

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
  console.error(JSON.stringify({
    event,
    err: {
      code: err.code,
      message: err.message,
      stack: err.stack,
    },
  }));

  callback(null, {
    statusCode: 500,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: err.stack,
  });
}
