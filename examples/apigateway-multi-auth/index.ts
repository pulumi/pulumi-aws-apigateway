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

const authorizer = {
    authType: "custom",
    authorizerName: "jwt-rsa-custom-authorizer",
    parameterName: "Authorization",
    identityValidationExpression: "^Bearer [-0-9a-zA-Z\._]*$",
    type: "token",
    parameterLocation: "header",
    authorizerResultTtlInSeconds: 300,
    handler: new aws.lambda.CallbackFunction("authorizer", {
        callback: authorizerLambda(),
    }),
}

// Create multiple routes with the same authorizer.
const routes: apigateway.types.input.RouteArgs[] = [];
for (let i = 0; i < 15; i++) {
    routes.push({
      path: `/route${i}`,
      method: "ANY",
      eventHandler: f,
      authorizers: [authorizer]
  });
}

const api = new apigateway.RestAPI("multi-auth-api", {
    routes: routes,
    binaryMediaTypes: ["application/json"],
});

export const url = api.url;
