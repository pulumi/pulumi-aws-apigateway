package main

import (
	apigateway "github.com/pulumi/pulumi-aws-apigateway/sdk/go/apigateway"
	"github.com/pulumi/pulumi-aws/sdk/v4/go/aws/cognito"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		// Create a user pool to contain authorized users of the API
		userPool, err := cognito.NewUserPool(ctx, "user-pool", &cognito.UserPoolArgs{})
		if err != nil {
			return err
		}

		localPath := "www"
		restAPI, err := apigateway.NewRestAPI(ctx, "api", &apigateway.RestAPIArgs{
			Routes: []apigateway.RouteArgs{
				{
					Path:      "/",
					LocalPath: &localPath,
					// Define an authorizer which uses Cognito to validate the token from the Authorization header
					Authorizers: []apigateway.AuthorizerArgs{
						{
							ParameterName:  "Authorization",
							IdentitySource: []string{"method.request.header.Authorization"},
							ProviderARNs:   []pulumi.StringInput{userPool.Arn},
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
