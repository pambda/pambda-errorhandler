const test = require('tape');
const { errorhandler } = require('..');

test('test', t => {
  t.plan(3);

  const pambda = errorhandler();

  const lambda = pambda((event, context, callback) => {
    callback(new Error(''));
  });

  lambda({}, {}, (err, result) => {
    t.error(err);
    t.equal(result.statusCode, 500);
    t.equal(result.body.stack, undefined);
  });
});

test('test for local running', t => {
  t.plan(3);

  process.env.AWS_SAM_LOCAL = 'true';

  const pambda = errorhandler();

  const lambda = pambda((event, context, callback) => {
    callback(new Error(''));
  });

  lambda({}, {}, (err, result) => {
    t.error(err);
    t.equal(result.statusCode, 500);
    t.ok(Array.isArray(result.body.stack));
  });
});
