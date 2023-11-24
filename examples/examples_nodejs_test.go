// Copyright 2016-2020, Pulumi Corporation.  All rights reserved.

package examples

import (
	"path"
	"path/filepath"
	"testing"

	"github.com/pulumi/pulumi/pkg/v3/testing/integration"
	"github.com/stretchr/testify/assert"
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
			Dir:     path.Join(getCwd(t), "./apikeysource"),
			Verbose: true,
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

func getJSBaseOptions(t *testing.T) integration.ProgramTestOptions {
	base := getBaseOptions(t)
	baseJS := base.With(integration.ProgramTestOptions{
		Dependencies: []string{
			"@pulumi/aws-apigateway",
		},
	})

	return baseJS
}
