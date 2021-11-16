package main

import (
	apigateway "github.com/pulumi/pulumi-aws-apigateway/sdk/go/apigateway"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		getMethod := apigateway.MethodGET
		localPath := "www"
		restAPI, err := apigateway.NewRestAPI(ctx, "api", &apigateway.RestAPIArgs{
			Routes: []apigateway.RouteArgs{
				{
					Path:      "/",
					Method:    &getMethod,
					LocalPath: &localPath,
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
