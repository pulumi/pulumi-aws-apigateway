import json
import pulumi
import pulumi_aws as aws
import iam
import pulumi_aws_apigateway as apigateway

authLambda = aws.lambda_.Function("auth-lambda",
                                  role=iam.lambda_role.arn,
                                  runtime=aws.lambda_.Runtime.PYTHON3D8,
                                  code=pulumi.AssetArchive({
                                      ".": pulumi.FileArchive("./authorizer"),
                                  }),
                                  handler="handler.handler",
                                  )

# Define an endpoint that invokes a lambda to handle requests
api = apigateway.RestAPI('api', routes=[
    apigateway.RouteArgs(path="/", method="GET", local_path="www",
                         authorizers=[apigateway.AuthorizerArgs(
                             auth_type="custom",
                             parameter_name="Authorization",
                             type="request",
                             identity_source=[
                                 "method.request.header.Authorization"],
                             handler=authLambda
                         )]),
])

pulumi.export('url', api.url)
