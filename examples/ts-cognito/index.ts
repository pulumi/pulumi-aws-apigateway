import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";

// Create a user pool to contain authorized users of the API
const userPool = new aws.cognito.UserPool('user-pool');

const api = new apigateway.RestAPI("api", {
    routes: [{
        path: "/",
        localPath: "www",
        // Define an authorizer which uses Cognito to validate the token from the Authorization header
        authorizers: [{
            parameterName: "Authorization",
            identitySource: ["method.request.header.Authorization"],
            providerARNs: [userPool.arn]
        }]
    }],
});

export const url = api.url;
