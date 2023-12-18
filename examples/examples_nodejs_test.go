// Copyright 2016-2020, Pulumi Corporation.  All rights reserved.

package examples

import (
	"path"
	"path/filepath"
	"testing"

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
	test.InstallStack("my-stack")
	test.SetConfig("additionalRoute", "false")
	res := test.Up()
	require.Equal(
		t,
		auto.OutputValue{Value: []string{"application/json"}},
		res.Outputs["binaryMediaTypes"],
	)
	test.SetConfig("additionalRoute", "true")
	res = test.Up()
	require.Equal(
		t,
		auto.OutputValue{Value: []string{"application/json"}},
		res.Outputs["binaryMediaTypes"],
	)
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
