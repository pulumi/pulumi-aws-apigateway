import * as apigateway from "@pulumi/aws-apigateway";
import * as aws from "@pulumi/aws";

import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config()

const useSwaggerSpec = config.getBoolean("useSwaggerSpec")
const useBinaryMediaType = config.getBoolean("useBinaryMediaType")

const role = new aws.iam.Role("role", {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({ Service: "lambda.amazonaws.com" }),
});

const lambda = new aws.lambda.Function("lambda", {
  role: role.arn,
  code: new pulumi.asset.AssetArchive({
    ".": new pulumi.asset.FileArchive("./handler"),
  }),
  runtime: "python3.8",
  handler: "handler.handler",
});

const api = new apigateway.RestAPI("api", {
  routes: useSwaggerSpec ? undefined : [
    {
      path: "/",
      method: "GET",
      eventHandler: lambda,
    },
  ],
  swaggerString: useSwaggerSpec ? `{
    "swagger": "2.0",
    "info": {
      "title": "myAPI",
      "version": "1.0"
    },
    "paths": {
      "/": {
        "get": {
          "responses": {
            "200": {
              "description": "200 response"
            }
          }
        }
      }
    }
  }` : undefined,
  binaryMediaTypes: useBinaryMediaType ? ["application/json"] : undefined
});


export const url = api.url;
