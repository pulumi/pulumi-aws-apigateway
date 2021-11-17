import json
import pulumi
import pulumi_apigateway as apigateway

# Define an endpoint that serves an entire directory of static content.
api = apigateway.RestAPI('api', routes=[
    apigateway.RouteArgs(path="/", local_path="www"),
])

pulumi.export('url', api.url)
