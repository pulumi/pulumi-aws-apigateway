import * as apigateway from "@pulumi/aws-apigateway";

// Define an endpoint that proxies HTTP requests to https://www.google.com.
const api = new apigateway.RestAPI("api", {
    routes: [{
        path: "/",
        target: {
            type: "http_proxy",
            uri: "https://www.google.com",
        }
    }],
});

export const url = api.url;
