// Copyright 2023, Pulumi Corporation.  All rights reserved.

// Disable running if we've specifically selected unit tests to run as this is an integration test.
// This is easier than having to remember to explicitly tag every unit test with `//go:build unit || all`.
//go:build !unit

package tests

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/pulumi/providertest"
	"github.com/pulumi/providertest/optproviderupgrade"
	"github.com/pulumi/providertest/pulumitest"
	"github.com/pulumi/providertest/pulumitest/assertpreview"
	"github.com/pulumi/providertest/pulumitest/opttest"
)

func TestApiUpgrade(t *testing.T) {
	testProviderUpgrade(t, "api", "1.0.1")
}

func TestSimpleNoBinaryMediaTypeUpgrade(t *testing.T) {
	testProviderUpgrade(t, "simple-no-binary-media-type", "2.1.0")
}

func TestSimpleWithManualSwaggerSpecUpgrade(t *testing.T) {
	testProviderUpgrade(t, "simple-with-manual-swagger-spec", "2.1.0")
}

func testProviderUpgrade(t *testing.T, dir, baselineVersion string) {
	// if testing.Short() {
	// 	t.Skipf("Skipping in testing.Short() mode, assuming a CI run without creds")
	// }
	providerName := "aws-apigateway"
	dir = filepath.Join("test-programs", dir)
	cwd, err := os.Getwd()
	require.NoError(t, err)
	test := pulumitest.NewPulumiTest(t, dir,
		opttest.DownloadProviderVersion(providerName, baselineVersion),
		opttest.LocalProviderPath(providerName, filepath.Join(cwd, "..", "..", "bin")),
	)
	result := providertest.PreviewProviderUpgrade(t, test, providerName, baselineVersion,
		optproviderupgrade.DisableAttach(),
	)
	assertpreview.HasNoReplacements(t, result)
}
