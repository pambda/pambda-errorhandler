# pambda-errorhandler

Error handler pambda.

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
    // errorhandler not applied.
    pambda1(),

    errorhandler({}),

    // errorhandler applied.
    pambda2()
  )
);
```

## API

### errorhandler(options)

- `options.renderError`
    - The function with argument `(err, event, context, callback)`, called when an error occurs in subsequent Pambdas.
    - Default value is `defaultErrorResponse`.
- `options.errorNotificationArn`
    - A topic ARN of SNS for publishing an error.
    - Default value is `process.env.ERROR_NOTIFICATION_ARN`.

If the `options.errorNotificationArn` is used, such as the following configuration is needed in your SAM template:

``` yaml
Resources:
  YourLambda:
    Type: AWS::Serverless::Function
    Properties:
      Policies:
        - SNSPublishMessagePolicy:
            TopicName: yourSnsTopicName
      Environment:
        Variables:
          ERROR_NOTIFICATION_ARN: !Sub "arn:aws:sns:${AWS::Region}:${AWS::AccountId}:yourSnsTopicName"
```

### defaultErrorResponse(err, event, context, callback)

Default error handling function. Returns Internal Server Error response.

Also, log objects that have properties of `event` and` err`.

## License

MIT
