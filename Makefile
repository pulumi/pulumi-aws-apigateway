PROVIDER_VERSION ?= 2.0.0-alpha.0+dev

PACK            := aws-apigateway
PROJECT         := github.com/pulumi/pulumi-${PACK}

PROVIDER        := pulumi-resource-${PACK}
VERSION_PATH    := provider/pkg/version.Version

JAVA_GEN := pulumi-java-gen
JAVA_GEN_VERSION := v0.9.7

WORKING_DIR     := $(shell pwd)
SCHEMA_PATH     := ${WORKING_DIR}/schema.yaml

GOPATH := $(shell go env GOPATH)

PULUMICTL_VERSION := v0.0.47

export PULUMI_IGNORE_AMBIENT_PLUGINS = true

build: build_provider build_nodejs_sdk build_python_sdk build_dotnet_sdk build_go_sdk build_java_sdk

generate: gen_go_sdk gen_nodejs_sdk gen_python_sdk gen_dotnet_sdk gen_java_sdk

install: install_provider install_nodejs_sdk install_dotnet_sdk

# Provider

build_provider:
	cd provider/cmd/${PROVIDER}/ && \
		yarn install --frozen-lockfile && \
		yarn check-duplicate-deps && \
		yarn tsc && \
		cp package.json ../../../schema.yaml ./bin && \
		sed -i.bak -e "s/\$${VERSION}/$(PROVIDER_VERSION)/g" bin/package.json && \
		yarn run pkg . --no-bytecode --public-packages "*" --public --target node18 --output ../../../bin/${PROVIDER}

install_provider: build_provider

test_provider: bin/gotestfmt
test_provider:
	cd provider && PATH="$(WORKING_DIR)/bin:$(PATH)" go test -v -json -tags=all -timeout 2h ./... | tee /tmp/gotest.log | gotestfmt

bin/gotestfmt:
	@mkdir -p bin
	GOBIN="${WORKING_DIR}/bin" go install github.com/gotesttools/gotestfmt/v2/cmd/gotestfmt@v2.5.0

# Go SDK

gen_go_sdk: .pulumi/bin/pulumi
	rm -rf go
	.pulumi/bin/pulumi package gen-sdk "${SCHEMA_PATH}" --language go --version "${PROVIDER_VERSION}"

build_go_sdk: gen_go_sdk

# .NET SDK

gen_dotnet_sdk: .pulumi/bin/pulumi
	rm -rf sdk/dotnet
	.pulumi/bin/pulumi package gen-sdk "${SCHEMA_PATH}" --language dotnet --version "${PROVIDER_VERSION}"
	echo "module fake_dotnet_module // Exclude this directory from Go tools\n\ngo 1.17" > sdk/dotnet/go.mod

build_dotnet_sdk: gen_dotnet_sdk
	cd sdk/dotnet/ && \
		dotnet build

install_dotnet_sdk: build_dotnet_sdk
	rm -rf ${WORKING_DIR}/nuget
	mkdir -p ${WORKING_DIR}/nuget
	find . -name '*.nupkg' -print -exec cp -p {} ${WORKING_DIR}/nuget \;

# Node.js SDK

gen_nodejs_sdk: .pulumi/bin/pulumi
	rm -rf sdk/nodejs
	.pulumi/bin/pulumi package gen-sdk "${SCHEMA_PATH}" --language nodejs --version "${PROVIDER_VERSION}"
	echo "module fake_nodejs_module // Exclude this directory from Go tools\n\ngo 1.17" > sdk/nodejs/go.mod

build_nodejs_sdk: gen_nodejs_sdk
	cd sdk/nodejs/ && \
		yarn install && \
		yarn run tsc --version && \
		yarn run tsc && \
		cp ../../README.md ../../LICENSE package.json package.json yarn.lock ./bin/

install_nodejs_sdk: build_nodejs_sdk
	yarn link --cwd ${WORKING_DIR}/sdk/nodejs/bin


# Python SDK

gen_python_sdk: .pulumi/bin/pulumi
	rm -rf sdk/python
	.pulumi/bin/pulumi package gen-sdk "${SCHEMA_PATH}" --language python --version "${PROVIDER_VERSION}"
	cp ${WORKING_DIR}/README.md sdk/python
	echo "module fake_python_module // Exclude this directory from Go tools\n\ngo 1.17" > sdk/python/go.mod

build_python_sdk: gen_python_sdk
	cd sdk/python/ && \
		rm -rf ./bin/ ../python.bin/ && cp -R . ../python.bin && mv ../python.bin ./bin && \
		python3 -m venv venv && \
		./venv/bin/python -m pip install build && \
		cd ./bin && \
		../venv/bin/python -m build .

# Java SDK

bin/pulumi-java-gen-version.$(JAVA_GEN_VERSION).txt:
	@mkdir -p bin/
	@rm -f bin/pulumi-java-gen.v*
	@echo "$(JAVA_GEN_VERSION)" >"$@"

bin/pulumi-java-gen: bin/pulumi-java-gen-version.$(JAVA_GEN_VERSION).txt
	@mkdir -p bin/
	pulumictl download-binary -n pulumi-language-java -v $(JAVA_GEN_VERSION) -r pulumi/pulumi-java

gen_java_sdk: bin/pulumi-java-gen
	rm -rf sdk/java
	$(WORKING_DIR)/bin/$(JAVA_GEN) generate --schema ${SCHEMA_PATH} --out sdk/java --build gradle-nexus
	echo "module fake_java_module // Exclude this directory from Go tools\n\ngo 1.17" > sdk/java/go.mod

build_java_sdk: gen_java_sdk
	cd sdk/java/ && \
		PACKAGE_VERSION="$(PROVIDER_VERSION)" gradle --console=plain build

.pulumi/bin/pulumi: PULUMI_VERSION := $(shell cat .pulumi.version)
.pulumi/bin/pulumi: HOME := $(WORKING_DIR)
.pulumi/bin/pulumi: .pulumi.version
	curl -fsSL https://get.pulumi.com | sh -s -- --version "$(PULUMI_VERSION)"

# builds all providers required for publishing
dist: PKG_ARGS := --no-bytecode --public-packages "*" --public
dist: build_provider
	cd provider/cmd/${PROVIDER}/ && \
		yarn run pkg . ${PKG_ARGS} --target node16-macos-x64 --output ../../../bin/darwin-amd64/${PROVIDER} && \
		yarn run pkg . ${PKG_ARGS} --target node16-macos-arm64 --output ../../../bin/darwin-arm64/${PROVIDER} && \
		yarn run pkg . ${PKG_ARGS} --target node16-linuxstatic-x64 --output ../../../bin/linux-amd64/${PROVIDER} && \
		yarn run pkg . ${PKG_ARGS} --target node16-linuxstatic-arm64 --output ../../../bin/linux-arm64/${PROVIDER} && \
		yarn run pkg . ${PKG_ARGS} --target node16-win-x64 --output ../../../bin/windows-amd64/${PROVIDER}.exe
	mkdir -p dist
	tar --gzip -cf ./dist/pulumi-resource-${PACK}-v${PROVIDER_VERSION}-linux-amd64.tar.gz README.md LICENSE -C bin/linux-amd64/ .
	tar --gzip -cf ./dist/pulumi-resource-${PACK}-v${PROVIDER_VERSION}-linux-arm64.tar.gz README.md LICENSE -C bin/linux-arm64/ .
	tar --gzip -cf ./dist/pulumi-resource-${PACK}-v${PROVIDER_VERSION}-darwin-amd64.tar.gz README.md LICENSE -C bin/darwin-amd64/ .
	tar --gzip -cf ./dist/pulumi-resource-${PACK}-v${PROVIDER_VERSION}-darwin-arm64.tar.gz README.md LICENSE -C bin/darwin-arm64/ .
	tar --gzip -cf ./dist/pulumi-resource-${PACK}-v${PROVIDER_VERSION}-windows-amd64.tar.gz README.md LICENSE -C bin/windows-amd64/ .

test: PATH := $(WORKING_DIR)/bin:$(PATH)
test:
	@export PATH
	cd examples && go test -v -json -tags=all -timeout 2h . 2>&1 | tee /tmp/gotest.log | gotestfmt

renovate: generate

.PHONY: build build_dotnet_sdk build_go_sdk build_java_sdk build_nodejs_sdk build_provider build_python_sdk gen_dotnet_sdk gen_go_sdk gen_java_sdk gen_nodejs_sdk gen_python_sdk generate install install_dotnet_sdk install_nodejs_sdk install_provider renovate
