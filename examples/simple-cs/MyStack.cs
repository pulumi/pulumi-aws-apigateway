using Pulumi;
using System.Collections.Generic;
using ApiGW = Pulumi.AwsApiGateway;
using Lambda = Pulumi.Aws.Lambda;
using Iam = Pulumi.Aws.Iam;

class MyStack : Stack
{
    public MyStack()
    {
        var lambdaRole = new Iam.Role("mylambda-role", new Iam.RoleArgs
        {
            AssumeRolePolicy =
                @"{
                ""Version"": ""2012-10-17"",
                ""Statement"": [{
                    ""Effect"": ""Allow"",
                    ""Principal"": { ""Service"": ""lambda.amazonaws.com"" },
                    ""Action"": ""sts:AssumeRole""
                }]
            }"
        });

        var rolePolicy = new Iam.RolePolicy("mylambda-policy", new Iam.RolePolicyArgs
        {
            Role = lambdaRole.Id,
            Policy =
               @"{
                ""Version"": ""2012-10-17"",
                ""Statement"": [{
                    ""Action"": [""logs:*"", ""cloudwatch:*""],
                    ""Resource"": ""*"",
                    ""Effect"": ""Allow""
                }]
            }"
        });

        // Closure serialization is not supported in multi-lang components
        // so we need to provide a handler function explicitly from the file-system.
        // Refer to https://github.com/pulumi/pulumi-aws-apigateway/tree/main/examples/simple-cs/handler
        // for an example handler.
        var lambda = new Lambda.Function("lambda", new Lambda.FunctionArgs
        {
            Runtime = Lambda.Runtime.Python3d8,
            Code = new AssetArchive(new Dictionary<string, AssetOrArchive>{
                ["."] = new FileArchive("./handler"),
            }),
            Timeout = 300,
            Handler = "handler.handler",
            Role = lambdaRole.Arn
        }, new Pulumi.CustomResourceOptions { DependsOn = { rolePolicy } });

        var restAPI = new ApiGW.RestAPI("api", new ApiGW.RestAPIArgs
        {
            Routes = new List<ApiGW.Inputs.RouteArgs>{
            new ApiGW.Inputs.RouteArgs{Path="/", Method=ApiGW.Method.GET, EventHandler=lambda}}
        });

        this.Url = restAPI.Url;
    }

    [Output]
    public Output<string> Url { get; set; }
}
