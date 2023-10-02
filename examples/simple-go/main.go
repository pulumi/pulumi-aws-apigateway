package main

import (
	apigateway "github.com/pulumi/pulumi-aws-apigateway/sdk/v2/go/apigateway"
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {

		role, err := iam.NewRole(ctx, "lambda-role", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.String(`{
				"Version": "2012-10-17",
				"Statement": [{
					"Effect": "Allow",
					"Principal": { "Service": "lambda.amazonaws.com" },
					"Action": "sts:AssumeRole"
				}]
			}`),
		})
		if err != nil {
			return err
		}

		policy, err := iam.NewRolePolicy(ctx, "lambda-policy", &iam.RolePolicyArgs{
			Role: role.ID(),
			Policy: pulumi.String(`{
				"Version": "2012-10-17",
				"Statement": [{
					"Action": ["logs:*", "cloudwatch:*"],
					"Resource": "*",
					"Effect": "Allow"
				}]
			}`),
		})
		if err != nil {
			return err
		}

		f, err := lambda.NewFunction(ctx, "lambda", &lambda.FunctionArgs{
			Runtime: lambda.RuntimePython3d8,
			Code: pulumi.NewAssetArchive(map[string]interface{}{
				".": pulumi.NewFileArchive("./handler"),
			}),
			Timeout: pulumi.Int(300),
			Handler: pulumi.String("handler.handler"),
			Role:    role.Arn,
		}, pulumi.DependsOn([]pulumi.Resource{policy}))
		if err != nil {
			return err
		}

		getMethod := apigateway.MethodGET
		restAPI, err := apigateway.NewRestAPI(ctx, "api", &apigateway.RestAPIArgs{
			Routes: []apigateway.RouteArgs{
				apigateway.RouteArgs{
					Path:         "/",
					Method:       &getMethod,
					EventHandler: f,
				},
			},
		})
		if err != nil {
			return err
		}

		ctx.Export("url", restAPI.Url)
		return nil
	})
}
