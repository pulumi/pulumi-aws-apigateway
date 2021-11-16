import * as apigateway from "@pulumi/aws-apigateway";

const api = new apigateway.RestAPI("api", {
    routes: [{
        path: "/",
        method: "GET",
        target: {
            type: "http_proxy",
            uri: "https://www.google.com",
        }
    }],
});

export const url = api.url;
