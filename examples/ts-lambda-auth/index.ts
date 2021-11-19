import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";
import { APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult } from "aws-lambda";

const authLambda = new aws.lambda.CallbackFunction<APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult>("auth", {
    callback: async (event, context) => {
        if (event.type !== "REQUEST") {
            throw new Error("Unexpected authorization type");
        }
        // --- Add your own custom authorization logic here. ---
        const effect = (event.headers?.Authorization === "goodToken") ? "Allow" : "Deny";
        return {
            principalId: "my-user",
            policyDocument: {
                Version: "2012-10-17",
                Statement: [{
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: event.methodArn
                }]
            }
        };
    }
});

const api = new apigateway.RestAPI("api", {
    routes: [{
        path: "/",
        localPath: "www",
        // Define an authorizer which uses Lambda to validate the token from the Authorization header
        authorizers: [{
            authType: "custom",
            parameterName: "Authorization",
            type: "request",
            identitySource: ["method.request.header.Authorization"],
            handler: authLambda,
        }]
    }],
});

export const url = api.url;
