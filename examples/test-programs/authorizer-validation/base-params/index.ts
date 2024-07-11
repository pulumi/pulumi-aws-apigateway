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

const authLambda = new aws.lambda.CallbackFunction("authorizer", {
  callback: authorizerLambda(),
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
      handler: authLambda,
    }]
  },
  {
    path: `/route2`,
    method: "ANY",
    eventHandler: f,
    authorizers: [{
      authType: "custom",
      authorizerName: "lambda-authorizer",
      parameterName: "Other", // <- here's the diff
      identityValidationExpression: "^Bearer [-0-9a-zA-Z\._]*$",
      type: "token",
      parameterLocation: "header",
      authorizerResultTtlInSeconds: 300,
      handler: authLambda,
    }]
  }
];

const api = new apigateway.RestAPI("multi-auth-api", {
    routes: routes,
    binaryMediaTypes: ["application/json"],
});

export const url = api.url;
