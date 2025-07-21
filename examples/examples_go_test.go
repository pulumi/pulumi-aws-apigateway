// Copyright 2016-2022, Pulumi Corporation.  All rights reserved.
//go:build go || all
// +build go all

package examples

import (
	"context"
	"path/filepath"
	"strings"
	"testing"

	"github.com/aws/aws-sdk-go-v2/config"
	apigatewaySdk "github.com/aws/aws-sdk-go-v2/service/apigateway"
	"github.com/pulumi/pulumi/pkg/v3/testing/integration"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestSimpleGo(t *testing.T) {
	// Assert the value of the API's DisableExecuteApiEndpoint, bypassing Pulumi and reading directly from AWS.
	assertDisableExecuteApiEndpointInAws := func(t *testing.T, ctx context.Context, expected bool, arn string) {
		region := getRegion(t)
		awsConf, err := config.LoadDefaultConfig(ctx, config.WithRegion(region))
		require.NoError(t, err)
		awsClient := apigatewaySdk.NewFromConfig(awsConf)

		// "arn:aws:apigateway:us-east-2::/restapis/xtsdcuywyg"
		lastSlash := strings.LastIndex(arn, "/")
		require.NotEqual(t, -1, lastSlash)
		apiId := arn[lastSlash+1:]

		awsApi, err := awsClient.GetRestApi(ctx, &apigatewaySdk.GetRestApiInput{RestApiId: &apiId})
		require.NoError(t, err)
		assert.Equal(t, expected, awsApi.DisableExecuteApiEndpoint)
	}

	test := getGoBaseOptions(t).
		With(integration.ProgramTestOptions{
			Dir: filepath.Join(getCwd(t), "simple-go"),
			ExtraRuntimeValidation: func(t *testing.T, stack integration.RuntimeValidationStackInfo) {
				disableExecuteApiEndpoint := stack.Outputs["disableExecuteApiEndpoint"].(bool)
				assert.Equal(t, false, disableExecuteApiEndpoint)

				assertDisableExecuteApiEndpointInAws(t, context.Background(), false, stack.Outputs["restApiARN"].(string))
			},
			EditDirs: []integration.EditDir{
				{
					Dir:      filepath.Join(getCwd(t), "simple-go", "step2-setDisableExecuteApiEndpoint"),
					Additive: true,
					ExtraRuntimeValidation: func(t *testing.T, stack integration.RuntimeValidationStackInfo) {
						disableExecuteApiEndpoint := stack.Outputs["disableExecuteApiEndpoint"].(bool)
						assert.Equal(t, true, disableExecuteApiEndpoint)

						assertDisableExecuteApiEndpointInAws(t, context.Background(), true, stack.Outputs["restApiARN"].(string))
					},
				},
			},
		})

	integration.ProgramTest(t, &test)
}

func getGoBaseOptions(t *testing.T) integration.ProgramTestOptions {
	base := getBaseOptions(t)
	rootSdkPath, _ := filepath.Abs("../sdk")
	baseGo := base.With(integration.ProgramTestOptions{
		Dependencies: []string{
			"github.com/pulumi/pulumi-aws-apigateway/sdk/v3=" + rootSdkPath,
		},
	})

	return baseGo
}
