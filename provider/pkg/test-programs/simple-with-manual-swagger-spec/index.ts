import * as apigateway from "@pulumi/aws-apigateway";
import * as aws from "@pulumi/aws";

import * as pulumi from "@pulumi/pulumi";

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
  swaggerString: pulumi.interpolate`{
    "swagger" : "2.0",
    "info" : {
      "version" : "1.0",
      "title" : "api"
    },
    "schemes" : [ "https" ],
    "paths" : {
      "/" : {
        "get" : {
          "responses" : { },
          "x-amazon-apigateway-integration" : {
            "type" : "aws_proxy",
            "httpMethod" : "POST",
            "uri" : "${lambda.invokeArn}",
            "passthroughBehavior" : "when_no_match"
          }
        }
      }
    }
  }`
}, { dependsOn: [lambda] });

export const url = api.url;
