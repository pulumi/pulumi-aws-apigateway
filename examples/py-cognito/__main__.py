import json
import pulumi
import pulumi_aws as aws
import pulumi_apigateway as apigateway

userPool = aws.cognito.UserPool("user-pool")

# Define an endpoint that serves an entire directory of static content.
api = apigateway.RestAPI("api", routes=[
    apigateway.RouteArgs(
        path="/",
        local_path="www",
        authorizers=[apigateway.AuthorizerArgs(
            parameterName="Authorization",
            identitySource=["method.request.header.Authorization"],
            providerARNs=[userPool.arn]
        )]
    ),
])

pulumi.export('url', api.url)
