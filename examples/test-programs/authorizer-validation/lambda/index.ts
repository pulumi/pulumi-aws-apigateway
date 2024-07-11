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

// Creates two routes with different authorizers that have the same name
const routes: apigateway.types.input.RouteArgs[] = [
  {
    path: `/route1`,
    method: "ANY",
    eventHandler: f,
    authorizers: [{
      authType: "custom",
      authorizerName: "lambda-authorizer",
      parameterName: "Authorization",
      identityValidationExpression: "^Bearer [-0-9a-zA-Z\._]*$",
      type: "token",
      parameterLocation: "header",
      authorizerResultTtlInSeconds: 300,
      handler: new aws.lambda.CallbackFunction("authorizerA", {
        callback: authorizerLambda(),
      }),
    }]
  },
  {
    path: `/route2`,
    method: "ANY",
    eventHandler: f,
    authorizers: [{
      authType: "custom",
      authorizerName: "lambda-authorizer",
      parameterName: "Authorization",
      identityValidationExpression: "^Bearer [-0-9a-zA-Z\._]*$",
      type: "token",
      parameterLocation: "header",
      authorizerResultTtlInSeconds: 300,
      handler: new aws.lambda.CallbackFunction("authorizerB", { // <- here's the diff, using a different lambda function
        callback: authorizerLambda(),
      }),
    }]
  }
];

const api = new apigateway.RestAPI("multi-auth-api", {
    routes: routes,
    binaryMediaTypes: ["application/json"],
});

export const url = api.url;
