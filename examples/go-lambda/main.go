package main

import (
	apigateway "github.com/pulumi/pulumi-aws-apigateway/sdk/go/apigateway"
	"github.com/pulumi/pulumi-aws/sdk/v4/go/aws/lambda"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		helloHandler, err := lambda.NewFunction(ctx, "hello-handler", &lambda.FunctionArgs{
			Runtime: lambda.RuntimePython3d8,
			Code: pulumi.NewAssetArchive(map[string]interface{}{
				".": pulumi.NewFileArchive("./handler"),
			}),
			Handler: pulumi.String("handler.handler"),
		})
		if err != nil {
			return err
		}

		// Define an endpoint that invokes a lambda to handle requests
		getMethod := apigateway.MethodGET
		restAPI, err := apigateway.NewRestAPI(ctx, "api", &apigateway.RestAPIArgs{
			Routes: []apigateway.RouteArgs{
				{
					Path:         "/",
					Method:       &getMethod,
					EventHandler: helloHandler,
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
