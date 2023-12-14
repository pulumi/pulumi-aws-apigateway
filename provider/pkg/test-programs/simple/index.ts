import * as apigateway from "@pulumi/aws-apigateway";
import * as aws from "@pulumi/aws";

import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config()

const useSwaggerSpec = config.getBoolean("useSwaggerSpec")
const useBinaryMediaType = config.getBoolean("useBinaryMediaType")

const lambda = new aws.lambda.CallbackFunction("f", {
  callback: async (ev: any, ctx: any) => {
    console.log(JSON.stringify(ev));
    return {
      statusCode: 200,
      body: "Hello world",
    };
  },
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
