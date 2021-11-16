import json
import pulumi
import pulumi_aws as aws
import pulumi_apigateway as apigateway

helloHandler = aws.lambda_.Function("mylambda",
    runtime=aws.lambda_.Runtime.PYTHON3D8,
    code=pulumi.AssetArchive({
        ".": pulumi.FileArchive("./handler"),
    }),
    handler="handler.handler",
)

api = apigateway.RestAPI('api', routes=[
    apigateway.RouteArgs(path="/", method="GET", event_handler=helloHandler),
])

pulumi.export('url', api.url)
