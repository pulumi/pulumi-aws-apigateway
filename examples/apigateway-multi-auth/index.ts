import * as aws from "@pulumi/aws";
import { authorizerLambda } from "./auth-lambda";
import * as apigateway from "@pulumi/aws-apigateway";

const f = new aws.lambda.CallbackFunction("f", {
    callback: async (ev, ctx) => {
      console.log(JSON.stringify(ev));
      return {
        statusCode: 200,
        body: "Hello, World!",
      };
    },
  });

const lambdaAuthorizer: apigateway.types.input.AuthorizerArgs = {
    authType: "custom",
    authorizerName: "lambda-authorizer",
    parameterName: "Authorization",
    identityValidationExpression: "^Bearer [-0-9a-zA-Z\._]*$",
    type: "token",
    parameterLocation: "header",
    authorizerResultTtlInSeconds: 300,
    handler: new aws.lambda.CallbackFunction("authorizer", {
        callback: authorizerLambda(),
    }),
}

const userPoolA = new aws.cognito.UserPool("userpoolA", {});
const userPoolB = new aws.cognito.UserPool("userpoolB", {});

const cognitoAuthorizer: apigateway.types.input.AuthorizerArgs = {
  authorizerName: "cognito-authorizer",
  parameterName: "Authorization",
  identityValidationExpression: "^Bearer [-0-9a-zA-Z\._]*$",
  parameterLocation: "header",
  authorizerResultTtlInSeconds: 300,
  providerARNs: [userPoolA.arn, userPoolB.arn],
}

// Create multiple routes with the same authorizer.
const routes: apigateway.types.input.RouteArgs[] = [];
for (let i = 0; i < 10; i++) {
    routes.push({
      path: `/route${i}`,
      method: "ANY",
      eventHandler: f,
      authorizers: [lambdaAuthorizer]
  });
}
for (let i = 10; i < 20; i++) {
    routes.push({
      path: `/route${i}`,
      method: "ANY",
      eventHandler: f,
      authorizers: [cognitoAuthorizer]
  });
}

const api = new apigateway.RestAPI("multi-auth-api", {
    routes: routes,
    binaryMediaTypes: ["application/json"],
});

export const url = api.url;
