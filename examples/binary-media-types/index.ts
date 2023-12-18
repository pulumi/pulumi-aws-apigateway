import * as apigateway from "@pulumi/aws-apigateway";
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const f = new aws.lambda.CallbackFunction("f", {
  callback: async (ev, ctx) => {
    console.log(JSON.stringify(ev));
    return {
      statusCode: 200,
      body: "goodbye",
    };
  },
});

let routes: apigateway.types.input.RouteArgs[] = [{

  path: "/",
  method: "GET",
  eventHandler: f,
},
]

const additionalRoute = (new pulumi.Config()).getBoolean("additionalRoute")
if (additionalRoute) {
  routes.push({
    path: "/additionalRoute",
    method: "GET",
    eventHandler: f,
  })
}

const api = new apigateway.RestAPI("api", {
  routes: routes,
  binaryMediaTypes: ["application/json"]
});

export const binaryMediaTypes = api.api.binaryMediaTypes
