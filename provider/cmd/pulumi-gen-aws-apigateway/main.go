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
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
	"gopkg.in/yaml.v3"

	"github.com/pulumi/pulumi-aws-apigateway/provider/v2/pkg/version"
	"github.com/pulumi/pulumi/pkg/v3/codegen/schema"
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

func parseLanguage(text string) (Language, error) {
	switch text {
	case "dotnet":
		return DotNet, nil
	case "go":
		return Go, nil
	case "python":
		return Python, nil
	case "nodejs":
		return Nodejs, nil
	case "schema":
		return Schema, nil
	default:
		allLangs := []Language{DotNet, Go, Python, Schema, Nodejs}
		allLangStrings := []string{}
		for _, lang := range allLangs {
			allLangStrings = append(allLangStrings, string(lang))
		}
		all := strings.Join(allLangStrings, ", ")
		return "", fmt.Errorf(`invalid language: %q, supported values include: %s`, text, all)
	}
}

func rootCmd() *cobra.Command {
	var outDir string
	cmd := &cobra.Command{
		Use:   Tool,
		Short: "Pulumi Package Schema and SDK generator for pulumi-awsx",
		Args: func(_ *cobra.Command, args []string) error {
			if len(args) != 1 {
				return fmt.Errorf("accepts %d arg(s), received %d", 1, len(args))
			}
			if _, err := parseLanguage(args[0]); err != nil {
				return err
			}
			return nil
		},
		RunE: func(_ *cobra.Command, args []string) error {
			cwd, err := os.Getwd()
			if err != nil {
				return err
			}
			lang, err := parseLanguage(args[0])
			if err != nil {
				return err
			}
			return generate(lang, cwd)
		},
	}
	cmd.PersistentFlags().StringVarP(&outDir, "out", "o", "", "Emit the generated code to this directory")
	return cmd
}

func generate(language Language, cwd string) error {
	switch language {
	case Schema:
		return generateSchema()
	case Nodejs, DotNet, Go, Python:
		schemaPath := filepath.Join(cwd, "provider/cmd/pulumi-resource-aws-apigateway/schema-embed.json")
		return generateSDK(language, schemaPath, cwd, version.Version)
	default:
		return fmt.Errorf("unrecognized language %q", language)
	}
}

func generateSDK(lang Language, schemaPath, base, version string) error {
	genSDKCmd := exec.Command(
		filepath.Join(base, ".pulumi/bin/pulumi"),
		"package", "gen-sdk", schemaPath, "--language", string(lang), "--version", version)
	genSDKCmd.Dir = base
	out, err := genSDKCmd.CombinedOutput()
	fmt.Println(string(out))

	if err != nil {
		return fmt.Errorf("error generating SDK: %w", err)
	}

	return nil
}

func generateSchema() error {
	contents, err := os.ReadFile("schema.yaml")
	if err != nil {
		return fmt.Errorf("error reading schema.json: %w", err)
	}

	jsonSchema, err := convertYamlSchemaToJSON(contents)
	if err != nil {
		return fmt.Errorf("error converting YAML to JSON: %w", err)
	}

	outputPath := "provider/cmd/pulumi-resource-aws-apigateway/schema.json"
	err = os.WriteFile(outputPath, jsonSchema, 0644)
	if err != nil {
		return fmt.Errorf("error writing schema.json: %w", err)
	}

	return nil
}

func convertYamlSchemaToJSON(yamlData []byte) ([]byte, error) {
	var packageSpec schema.PackageSpec
	if err := yaml.Unmarshal(yamlData, &packageSpec); err != nil {
		return nil, fmt.Errorf("error unmarshalling YAML: %w", err)
	}

	return json.MarshalIndent(packageSpec, "", "  ")
}

func main() {
	if err := rootCmd().Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
