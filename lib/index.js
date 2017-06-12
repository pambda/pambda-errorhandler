const assert = require('assert');

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

      console.error(err);

      renderError(err, event, context, callback);
    });
  };
};

function defaultErrorResponse(err, event, context, callback) {
  callback(null, {
    statusCode: 500,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: err.stack,
  });
}
