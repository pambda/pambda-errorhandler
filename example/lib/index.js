const { compose, createLambda } = require('pambda');
const { errorhandler } = require('../..');

exports.handler = createLambda(
  compose(
    errorhandler(),
    next => (event, context, callback) => {
      callback(new Error('Sample Error'));
    },
  )
);
