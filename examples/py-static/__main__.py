import json
import pulumi
import pulumi_apigateway as apigateway

api = apigateway.RestAPI('api', routes=[
    apigateway.RouteArgs(path="/", method="GET", local_path="www"),
])

pulumi.export('url', api.url)
