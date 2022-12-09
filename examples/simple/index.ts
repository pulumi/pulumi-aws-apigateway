import * as apigateway from "@pulumi/aws-apigateway";
import * as aws from "@pulumi/aws";

const f = new aws.lambda.CallbackFunction("f", {
  callback: async (ev, ctx) => {
    console.log(JSON.stringify(ev));
    return {
      statusCode: 200,
      body: "goodbye",
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
});

// TODO: re-enable once we establish why `api.api.id` is coming back as undefined

// const apiKey = new aws.apigateway.ApiKey("api-key");
// const usagePlan = new aws.apigateway.UsagePlan("usage-plan", {
//   apiStages: [
//     {
//       apiId: api.api.id,
//       stage: api.stage.stageName,
//     },
//   ],
// });

// new aws.apigateway.UsagePlanKey("usage-plan-key", {
//   keyId: apiKey.id,
//   keyType: "API_KEY",
//   usagePlanId: usagePlan.id,
// });

export const url = api.url;
