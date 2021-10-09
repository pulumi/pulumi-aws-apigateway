module simple-go

go 1.14

require (
	github.com/lukehoban/pulumi-package-aws-apigateway/sdk v0.0.2
	github.com/pulumi/pulumi-aws/sdk/v4 v4.22.0
	github.com/pulumi/pulumi/sdk/v3 v3.13.2
)

replace github.com/lukehoban/pulumi-package-aws-apigateway/sdk => ../../sdk
