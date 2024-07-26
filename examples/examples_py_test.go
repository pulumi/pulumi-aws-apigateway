// Copyright 2016-2020, Pulumi Corporation.  All rights reserved.

package examples

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/pulumi/pulumi/pkg/v3/testing/integration"
)

func TestSimplePy(t *testing.T) {
	test := getPythonBaseOptions(t).
		With(integration.ProgramTestOptions{
			Dir: filepath.Join(getCwd(t), "simple-py"),
		})

	integration.ProgramTest(t, &test)
}

func getPythonBaseOptions(t *testing.T) integration.ProgramTestOptions {
	base := getBaseOptions(t)
	sdkPath := filepath.Join("..", "sdk", "python", "bin")
	if _, err := os.Stat(sdkPath); os.IsNotExist(err) {
		t.Fatalf("python SDK not found at %s, run `make build_python` first", sdkPath)
	}
	basePy := base.With(integration.ProgramTestOptions{
		Dependencies: []string{sdkPath},
	})

	return basePy
}
