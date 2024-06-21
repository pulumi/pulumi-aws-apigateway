// Copyright 2021, Pulumi Corporation.  All rights reserved.

package examples

import (
	"context"
	"net/http"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/pulumi/pulumi/pkg/v3/testing/integration"
	"github.com/pulumi/pulumi/sdk/v3/go/common/util/retry"
	"github.com/stretchr/testify/assert"
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

func retryGETRequestUntil(t *testing.T, url string, headers map[string]string, expectedStatusCode int, timeout time.Duration) {
	_, finalStatusCode, err := retry.UntilTimeout(context.TODO(), retry.Acceptor{
		Accept: func(try int, delay time.Duration) (bool, interface{}, error) {
			req, err := http.NewRequest("GET", url, nil)
			if err != nil {
				return false, nil, err
			}

			for k, v := range headers {
				// Host header cannot be set via req.Header.Set(), and must be set
				// directly.
				if strings.ToLower(k) == "host" {
					req.Host = v
					continue
				}
				req.Header.Set(k, v)
			}

			client := &http.Client{Timeout: time.Second * 10}
			resp, err := client.Do(req)
			assert.NoError(t, err, "error reading response: %v", err)
			if resp.Body != nil {
				defer resp.Body.Close()
			}

			if err != nil {
				t.Logf("Http Error: %v\n", err)
				return false, nil, nil
			}

			return resp.StatusCode == expectedStatusCode, resp.StatusCode, nil
		},
	}, timeout)
	assert.NoError(t, err, "error retrying request: %v", err)
	assert.Equal(t, expectedStatusCode, finalStatusCode, "expected status code %d, got %d", expectedStatusCode, finalStatusCode)
}
