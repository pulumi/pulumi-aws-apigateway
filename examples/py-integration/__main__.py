import json
import pulumi
import pulumi_apigateway as apigateway

# Define an endpoint that proxies HTTP requests to https://www.google.com.
api = apigateway.RestAPI('api', routes=[
    apigateway.RouteArgs(path="/integration", target=apigateway.TargetArgs(uri="https://www.google.com", type="http_proxy"))
])

pulumi.export('url', api.url)
