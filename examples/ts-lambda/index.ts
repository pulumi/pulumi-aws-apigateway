import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";

const helloHandler = new aws.lambda.CallbackFunction("hello-handler", {
    callback: async (ev, ctx) => {
        console.log(JSON.stringify(ev));
        return {
            statusCode: 200,
            body: "Hello, API Gateway!",
        };
    },
});

// Define an endpoint that invokes a lambda to handle requests
const api = new apigateway.RestAPI("api", {
    routes: [{
        path: "/",
        method: "GET",
        eventHandler: helloHandler,
    }],
});

export const url = api.url;
