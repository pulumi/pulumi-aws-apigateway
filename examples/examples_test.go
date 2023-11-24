// Copyright 2021, Pulumi Corporation.  All rights reserved.

package examples

import (
	"os"
	"testing"

	"github.com/pulumi/pulumi/pkg/v3/testing/integration"
)

func getRegion(t *testing.T) string {
	envRegion := os.Getenv("AWS_REGION")
	if envRegion == "" {
		t.Skipf("Skipping test due to missing AWS_REGION environment variable")
	}

	return envRegion
}

func getBaseOptions(t *testing.T) integration.ProgramTestOptions {
	awsRegion := getRegion(t)
	return integration.ProgramTestOptions{
		SkipRefresh: true,
		Quick:       true,
		Dependencies: []string{
			"@pulumi/aws-apigateway",
		},
		Config: map[string]string{
			"aws:region": awsRegion,
		},
	}
}

func getCwd(t *testing.T) string {
	cwd, err := os.Getwd()
	if err != nil {
		t.FailNow()
	}

	return cwd
}

func skipIfShort(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping long-running test in short mode")
	}
}
