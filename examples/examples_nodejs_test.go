// Copyright 2016-2020, Pulumi Corporation.  All rights reserved.

package examples

import (
	"path"
	"path/filepath"
	"testing"
	"time"

	"github.com/pulumi/providertest/pulumitest"
	"github.com/pulumi/pulumi/pkg/v3/testing/integration"
	"github.com/pulumi/pulumi/sdk/v3/go/auto"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestSimpleTs(t *testing.T) {
	test := getJSBaseOptions(t).
		With(integration.ProgramTestOptions{
			Dir: filepath.Join(getCwd(t), "simple"),
		})

	integration.ProgramTest(t, &test)
}

func TestAccApiKeySource(t *testing.T) {
	test := getBaseOptions(t).
		With(integration.ProgramTestOptions{
			Dir: path.Join(getCwd(t), "./apikeysource"),
			EditDirs: []integration.EditDir{
				{
					Dir:      "./apikeysource/step2",
					Additive: true,
					ExtraRuntimeValidation: func(t *testing.T, stack integration.RuntimeValidationStackInfo) {
						apiKeySource := stack.Outputs["apiKeySource"].(string)
						assert.Equal(t, "AUTHORIZER", apiKeySource)
					},
				},
			},
		})

	integration.ProgramTest(t, &test)
}

func TestBinaryMediaTypesRetained(t *testing.T) {
	test := pulumitest.NewPulumiTest(t, "binary-media-types")
	test.InstallStack(t, "my-stack")

	test.SetConfig(t, "additionalRoute", "false")
	res := test.Up(t)
	require.EqualValues(t, 1, res.Outputs["numRoutes"].Value)
	require.Equal(
		t,
		auto.OutputValue{Value: []interface{}{}},
		res.Outputs["binaryMediaTypes"],
	)

	test.SetConfig(t, "additionalRoute", "true")
	res = test.Up(t)
	require.EqualValues(t, 2, res.Outputs["numRoutes"].Value)
	require.Equal(
		t,
		auto.OutputValue{Value: []interface{}{}},
		res.Outputs["binaryMediaTypes"],
	)
}

func TestTagging(t *testing.T) {
	t.Skip("TODO[pulumi/pulumi-aws-apigateway#111]")
	test := getJSBaseOptions(t).
		With(integration.ProgramTestOptions{
			Dir: filepath.Join(getCwd(t), "tagged-api-gateway"),
			ExtraRuntimeValidation: func(t *testing.T, stackInfo integration.RuntimeValidationStackInfo) {
				expectedTags := map[string]interface{}{
					"environment": "development",
					"test":        "test-tag",
				}
				assert.Equal(t, expectedTags, stackInfo.Outputs["apiTags"])
				assert.Equal(t, expectedTags, stackInfo.Outputs["stageTags"])
			},
		})

	integration.ProgramTest(t, &test)
}

func TestAuth(t *testing.T) {
	test := getJSBaseOptions(t).
		With(integration.ProgramTestOptions{
			Dir: filepath.Join(getCwd(t), "apigateway-auth"),
			ExtraRuntimeValidation: func(t *testing.T, stackInfo integration.RuntimeValidationStackInfo) {
				url := stackInfo.Outputs["url"].(string) + "test"

				validAuthHeaders := map[string]string{"Authorization": "Bearer DUMMY_TOKEN"}

				// Make a request to the API Gateway endpoint with an auth token to verify it's working
				integration.AssertHTTPResultWithRetry(t, url, validAuthHeaders, 60*time.Second, func(body string) bool {
					return assert.Equal(t, "Hello, World!", body, "Body should equal 'Hello, World!', got %s", body)
				})

				// Make a request to the API Gateway endpoint without an auth token and expect a 401 to verify the authorizer is working
				retryGETRequestUntil(t, url, nil, 401, 60*time.Second)
			},
		})

	integration.ProgramTest(t, &test)
}

func TestMultiAuth(t *testing.T) {
	test := getJSBaseOptions(t).
		With(integration.ProgramTestOptions{
			// Tests whether authorizers can be reused. This is done by creating 20 routes 10 using a common lambda authorizer
			// and the other 10 using a common cognito authorizer. API Gateway only allows 10 authorizers per API Gateway,
			// so if the authorizers are not re-used, the test will fail.
			Dir: filepath.Join(getCwd(t), "apigateway-multi-auth"),
		})

	integration.ProgramTest(t, &test)
}

func TestAuthorizerValidation(t *testing.T) {
	test := getJSBaseOptions(t).
		With(integration.ProgramTestOptions{
			// Tests whether the validation correctly detects invalid authorizer configurations.
			Dir:           filepath.Join(getCwd(t), "test-programs", "authorizer-validation", "base-params"),
			ExpectFailure: true,
			EditDirs: []integration.EditDir{
				{
					Dir:           filepath.Join(getCwd(t), "test-programs", "authorizer-validation", "lambda"),
					Additive:      true,
					ExpectFailure: true,
				},
				{
					Dir:           filepath.Join(getCwd(t), "test-programs", "authorizer-validation", "cognito"),
					Additive:      true,
					ExpectFailure: true,
				},
			},
		})

	integration.ProgramTest(t, &test)
}

func getJSBaseOptions(t *testing.T) integration.ProgramTestOptions {
	base := getBaseOptions(t)
	baseJS := base.With(integration.ProgramTestOptions{
		Dependencies: []string{
			"@pulumi/aws-apigateway",
		},
	})

	return baseJS
}
