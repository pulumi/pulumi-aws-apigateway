package main

import (
	apigateway "github.com/pulumi/pulumi-aws-apigateway/sdk/go/apigateway"
	"github.com/pulumi/pulumi-aws/sdk/v4/go/aws/iam"
	"github.com/pulumi/pulumi-aws/sdk/v4/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		role, err := iam.NewRole(ctx, "auth-exec-role", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.String(`{
				"Version": "2012-10-17",
				"Statement": [{
					"Sid": "",
					"Effect": "Allow",
					"Principal": {
						"Service": "lambda.amazonaws.com"
					},
					"Action": "sts:AssumeRole"
				}]
			}`),
		})
		if err != nil {
			return err
		}

		logPolicy, _ := iam.NewRolePolicy(ctx, "lambda-log-policy", &iam.RolePolicyArgs{
			Role: role.Name,
			Policy: pulumi.String(`{
                "Version": "2012-10-17",
                "Statement": [{
                    "Effect": "Allow",
                    "Action": [
                        "logs:CreateLogGroup",
                        "logs:CreateLogStream",
                        "logs:PutLogEvents"
                    ],
                    "Resource": "arn:aws:logs:*:*:*"
                }]
            }`),
		})

		authLambda, err := lambda.NewFunction(ctx, "auth", &lambda.FunctionArgs{
			Runtime: lambda.RuntimePython3d8,
			Code: pulumi.NewAssetArchive(map[string]interface{}{
				".": pulumi.NewFileArchive("./authorizer"),
			}),
			Handler: pulumi.String("handler.handler"),
			Role:    role.Arn, // Insists on role being created explicitly
		}, pulumi.DependsOn([]pulumi.Resource{logPolicy}))
		if err != nil {
			return err
		}

		localPath := "www"
		authType := "custom"
		authorizerType := "request"
		restAPI, err := apigateway.NewRestAPI(ctx, "api", &apigateway.RestAPIArgs{
			Routes: []apigateway.RouteArgs{
				{
					Path:      "/",
					LocalPath: &localPath,
					Authorizers: []apigateway.AuthorizerArgs{
						{
							AuthType:       &authType,
							ParameterName:  "Authorization",
							Type:           &authorizerType,
							IdentitySource: []string{"method.request.header.Authorization"},
							Handler:        authLambda,
						},
					},
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
