# pambda-errorhandler

Error handler pambda.

## Installation

```
npm i pambda-errorhandler -S
```

## Usage

``` javascript
import { compose, createLambda } from 'pambda';
import { errorhandler } from 'pambda-errorhandler';

export const handler = createLambda(
  compose(
    // errorhandler not applied.
    pambda1(),

    errorhandler({}),

    // errorhandler applied.
    pambda2()
  )
);
```

## errorhandler(options)

- `options.renderError`
    - The function with argument `(err, event, context, callback)`, called when an error occurs in subsequent Pambdas.
    - Default value is `defaultErrorResponse`.

## defaultErrorResponse(err, event, context, callback)

Default error handling function. Returns Internal Server Error response.

Also, log objects that have properties of `event` and` err`.

## License

MIT
