import * as apigateway from "@pulumi/aws-apigateway";
import * as aws from "@pulumi/aws";

const f = new aws.lambda.CallbackFunction("f", {
  callback: async (ev, ctx) => {
    console.log(JSON.stringify(ev));
    return {
      statusCode: 200,
      body: "Hello World!",
    };
  },
});

const api = new apigateway.RestAPI("api", {
  routes: [
    {
      path: "/",
      method: "GET",
      eventHandler: f,
    },
  ],
  binaryMediaTypes: ["application/json"],
  description: "test",
  tags: {
    "environment": "development",
    "test": "test-tag"
  },
});

export const url = api.url;
export const apiTags = api.api.tags;
export const stageTags = api.stage.tags;
