# pambda-errorhandler

エラーハンドリングを行う Pambda.

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
    // errorhandler が適用されない。
    pambda1(),

    errorhandler({}),

    // errorhandler が適用される。
    pambda2()
  )
);
```

## errorhandler(options)

- `options.renderError`
    - 引数 `(err, event, context, callback)` を持つ関数。
      後続の Pambda でエラーが発生した時に呼ばれる。

## License

MIT
