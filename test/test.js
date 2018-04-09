const test = require('tape');
const { errorhandler } = require('..');

test('test', t => {
  t.plan(2);

  const pambda = errorhandler();

  const lambda = pambda((event, context, callback) => {
    callback(new Error(''));
  });

  lambda({}, {}, (err, result) => {
    t.error(err);
    t.equal(result.statusCode, 500);
  });
});
