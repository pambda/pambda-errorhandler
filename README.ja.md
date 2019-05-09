# pambda-errorhandler

エラーハンドリングを行う Pambda.

## Installation

```
npm i pambda-errorhandler
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
    - デフォルト値は `defaultErrorResponse`.

## defaultErrorResponse(err, event, context, callback)

デフォルトのエラー処理関数。 Internal Server Error のレスポンスを返す。

また、`event` と `err` のプロパティを持つオブジェクトをログ出力する。

## License

MIT
