import * as aws from "@pulumi/aws";
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

const userPoolA = new aws.cognito.UserPool("userpoolA", {});
const userPoolB = new aws.cognito.UserPool("userpoolB", {});

// Creates two routes with different authorizers that have the same name
const routes: apigateway.types.input.RouteArgs[] = [
  {
    path: `/route1`,
    method: "ANY",
    eventHandler: f,
    authorizers: [{
      authorizerName: "cognito-authorizer",
      parameterName: "Authorization",
      identityValidationExpression: "^Bearer [-0-9a-zA-Z\._]*$",
      parameterLocation: "header",
      authorizerResultTtlInSeconds: 300,
      providerARNs: [userPoolB.arn],
    }]
  },
  {
    path: `/route2`,
    method: "ANY",
    eventHandler: f,
    authorizers: [{
      authorizerName: "cognito-authorizer",
      parameterName: "Authorization",
      identityValidationExpression: "^Bearer [-0-9a-zA-Z\._]*$",
      parameterLocation: "header",
      authorizerResultTtlInSeconds: 300,
      providerARNs: [userPoolA.arn], // <- here's the diff, using userPoolA instead of userPoolB
    }]
  }
];

const api = new apigateway.RestAPI("multi-auth-api", {
    routes: routes,
    binaryMediaTypes: ["application/json"],
});

export const url = api.url;
