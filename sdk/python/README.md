# Pulumi AWS API Gateway Component

Easily create AWS API Gateway REST APIs using Pulumi. This component exposes the Crosswalk for AWS functionality documented in the [Pulumi AWS API Gateway guide](https://www.pulumi.com/docs/guides/crosswalk/aws/api-gateway/) as a package available in all Pulumi languages.

## Installing

This package is available in many languages in the standard packaging formats.

### Node.js (Java/TypeScript)

To use from JavaScript or TypeScript in Node.js, install using either `npm`:

    npm install @pulumi/aws-apigateway

or `yarn`:

    yarn add @pulumi/aws-apigateway

### Python

To use from Python, install using `pip`:

    pip install pulumi-aws-apigateway

### Go

To use from Go, use `go get` to grab the latest version of the library

    go get github.com/pulumi/pulumi-aws-apigateway/sdk

### .NET

To use from .NET, install using `dotnet add package`:

    dotnet add package Pulumi.AwsApiGateway

## Example

Python:

```py
api = apigateway.RestAPI('api', routes=[
    apigateway.RouteArgs(path="/", method="GET", event_handler=f),
    apigateway.RouteArgs(path="/www", method="GET", local_path="www", index=False),
    apigateway.RouteArgs(path="/integration", target=apigateway.TargetArgs(uri="https://www.google.com", type="http_proxy"))
])

pulumi.export('url', api.url)
```

Go:

```go
getMethod := apigateway.MethodGET
restAPI, err := apigateway.NewRestAPI(ctx, "api", &apigateway.RestAPIArgs{
    Routes: []apigateway.RouteArgs{
        apigateway.RouteArgs{
            Path:         "/",
            Method:       &getMethod,
            EventHandler: f,
        },
    },
})
```

TypeScript:

```ts
import * as apigateway from "@pulumi/aws-apigateway";
import * as aws from "@pulumi/aws";

const f = new aws.lambda.CallbackFunction("f", {
    callback: async (ev, ctx) => {
        console.log(JSON.stringify(ev));
        return {
            statusCode: 200,
            body: "goodbye",
        };
    },
});

const api = new apigateway.RestAPI("api", {
    routes: [{
        path: "/",
        method: "GET",
        eventHandler: f,
    }],
});

export const url = api.url;
```
