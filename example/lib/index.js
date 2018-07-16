const { compose, createLambda } = require('pambda');
const { errorhandler } = require('pambda-errorhandler');

exports.handler = createLambda(
  compose(
    errorhandler(),
    next => (event, context, callback) => {
      callback(new Error('Sample Error'));
    },
  )
);
