import json
import pulumi
import pulumi_aws as aws
import pulumi_apigateway as apigateway

# Create a user pool to contain authorized users of the API
userPool = aws.cognito.UserPool("user-pool")

api = apigateway.RestAPI("api", routes=[
    apigateway.RouteArgs(
        path="/",
        local_path="www",
        # Define an authorizer which uses Cognito to validate the token from the Authorization header
        authorizers=[apigateway.AuthorizerArgs(
            parameterName="Authorization",
            identitySource=["method.request.header.Authorization"],
            providerARNs=[userPool.arn]
        )]
    ),
])

pulumi.export('url', api.url)
