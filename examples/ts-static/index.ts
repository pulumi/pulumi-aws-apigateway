import * as apigateway from "@pulumi/aws-apigateway";

const api = new apigateway.RestAPI("api", {
    routes: [{
        path: "/",
        method: "GET",
        localPath: "www",
    }],
});

export const url = api.url;
