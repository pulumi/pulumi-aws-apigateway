// Copyright 2016-2025, Pulumi Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// nolint:gosec
package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

const Tool = "pulumi-gen-aws-apigateway"

// Language is the SDK language.
type Language string

const (
	Nodejs Language = "nodejs"
	DotNet Language = "dotnet"
	Go     Language = "go"
	Python Language = "python"
	Schema Language = "schema"
)

func main() {
	printUsage := func() {
		fmt.Printf("Usage: %s <language> <out-dir> <root-pulumi-aws-apigateway-dir> [schema-file] [version]\n", os.Args[0])
	}

	args := os.Args[1:]
	if len(args) < 2 {
		printUsage()
		os.Exit(1)
	}

	// Note: outdir is not required since gen-sdk will create the folders from root. We keep it here to keep the same signature as the other providers.
	language, _ := Language(args[0]), args[1]

	var schemaFile string
	var version string
	var base string
	if language != Schema {
		if len(args) < 5 {
			printUsage()
			os.Exit(1)
		}
		base, schemaFile, version = args[2], args[3], args[4]
	} else if len(args) >= 3 {
		version = args[2]
	}

	switch language {
	case Nodejs, DotNet, Go, Python:
		generateSDK(language, schemaFile, base, version)
	case Schema:
		generateSchema()
	default:
		panic(fmt.Sprintf("Unrecognized language %q", language))
	}
}

func generateSDK(lang Language, schemaPath, base, version string) {
	genSDKCmd := exec.Command(filepath.Join(base, ".pulumi/bin/pulumi"), "package", "gen-sdk", schemaPath, "--language", string(lang), "--version", version)
	genSDKCmd.Dir = base
	out, err := genSDKCmd.CombinedOutput()
	fmt.Println(string(out))

	if err != nil {
		fmt.Printf("Error generating SDK: %v\n", err)
		os.Exit(1)
	}
}

func generateSchema() {
	// Read contents of schema.yaml file.
	contents, err := os.ReadFile("../../../schema.yaml")
	if err != nil {
		fmt.Printf("Error reading schema.yaml: %v\n", err)
		os.Exit(1)
	}

	// Write contents to schema.json file. Note: the content is still a yaml file as gen-sdk can accept a yaml file.
	// We call it schema.json to keep the same signature as the other providers.
	outputPath := "../pulumi-resource-aws-apigateway/schema.json"
	err = os.WriteFile(outputPath, contents, 0644)
	if err != nil {
		fmt.Printf("Error writing schema.json: %v\n", err)
		os.Exit(1)
	}
}
