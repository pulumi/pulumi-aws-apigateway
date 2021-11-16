import json
import pulumi
import pulumi_apigateway as apigateway

api = apigateway.RestAPI('api', routes=[
    apigateway.RouteArgs(path="/integration", target=apigateway.TargetArgs(uri="https://www.google.com", type="http_proxy"))
])

pulumi.export('url', api.url)
