import * as apigateway from "@pulumi/aws-apigateway";

// Define an endpoint that serves an entire directory of static content.
const api = new apigateway.RestAPI("api", {
    routes: [{
        path: "/",
        localPath: "www",
    }],
});

export const url = api.url;
