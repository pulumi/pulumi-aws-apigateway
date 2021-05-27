import json
import pulumi
import pulumi_aws as aws
import pulumi_apigateway as apigateway

role = aws.iam.Role("mylambda-role",
    assume_role_policy=json.dumps({
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Principal": { "Service": "lambda.amazonaws.com" },
            "Action": "sts:AssumeRole"
        }]
    })
)

policy = aws.iam.RolePolicy("mylambda-policy",
    role=role.id,
    policy=json.dumps({
        "Version": "2012-10-17",
        "Statement": [{
            "Action": ["logs:*", "cloudwatch:*"],
            "Resource": "*",
            "Effect": "Allow",
        }],
    }))

f = aws.lambda_.Function("mylambda",
    runtime=aws.lambda_.Runtime.PYTHON3D8,
    code=pulumi.AssetArchive({
        ".": pulumi.FileArchive("./handler"),
    }),
    timeout=300,
    handler="handler.handler",
    role=role.arn,
    opts=pulumi.ResourceOptions(depends_on=[policy]),
)

api = apigateway.RestAPI('api', routes=[
    apigateway.EventHandlerRouteArgs(method="GET", path="/", function=f),
])

pulumi.export('url', api.url)
