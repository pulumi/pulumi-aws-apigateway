VERSION ?= 0.0.1

PACK            := aws-apigateway
PROJECT         := github.com/pulumi/pulumi-${PACK}

PROVIDER        := pulumi-resource-${PACK}
CODEGEN         := pulumi-gen-${PACK}
VERSION_PATH    := provider/pkg/version.Version

JAVA_GEN := pulumi-java-gen
JAVA_GEN_VERSION := v0.9.7

WORKING_DIR     := $(shell pwd)
SCHEMA_PATH     := ${WORKING_DIR}/schema.yaml

build:: build_provider build_nodejs_sdk build_python_sdk build_dotnet_sdk build_go_sdk build_java_sdk

generate:: gen_go_sdk gen_nodejs_sdk gen_python_sdk gen_dotnet_sdk gen_java_sdk

install:: install_provider install_nodejs_sdk install_dotnet_sdk

# Provider

build_provider::
	cd provider/cmd/${PROVIDER}/ && \
		yarn install && \
		yarn tsc && \
		cp package.json ../../../schema.yaml ./bin && \
		sed -i.bak -e "s/\$${VERSION}/$(VERSION)/g" bin/package.json

install_provider:: PKG_ARGS := --no-bytecode --public-packages "*" --public
install_provider:: build_provider
	cd provider/cmd/${PROVIDER}/ && \
		yarn run pkg . ${PKG_ARGS} --target node18 --output ../../../bin/${PROVIDER}

.PHONY: test_provider
test_provider: bin/gotestfmt
test_provider: 
	cd provider && PATH=$(WORKING_DIR)/bin:$(PATH) go test -v -json -tags=all -timeout 2h ./... | tee /tmp/gotest.log | gotestfmt

bin/gotestfmt:
	@mkdir -p bin
	GOBIN="${WORKING_DIR}/bin" go install github.com/gotesttools/gotestfmt/v2/cmd/gotestfmt@v2.5.0

# Go SDK

gen_go_sdk::
	rm -rf go
	cd provider/cmd/${CODEGEN} && go run . go ../../../sdk/go ${SCHEMA_PATH}

build_go_sdk:: gen_go_sdk

# .NET SDK

gen_dotnet_sdk::
	rm -rf sdk/dotnet
	cd provider/cmd/${CODEGEN} && go run . dotnet ../../../sdk/dotnet ${SCHEMA_PATH}

build_dotnet_sdk:: gen_dotnet_sdk
	cd sdk/dotnet/ && \
		echo "module fake_dotnet_module // Exclude this directory from Go tools\n\ngo 1.17" > go.mod && \
		echo "${VERSION}" >version.txt && \
		dotnet build /p:Version=${VERSION}

install_dotnet_sdk:: build_dotnet_sdk
	rm -rf ${WORKING_DIR}/nuget
	mkdir -p ${WORKING_DIR}/nuget
	find . -name '*.nupkg' -print -exec cp -p {} ${WORKING_DIR}/nuget \;

# Node.js SDK

gen_nodejs_sdk::
	rm -rf sdk/nodejs
	cd provider/cmd/${CODEGEN} && go run . nodejs ../../../sdk/nodejs ${SCHEMA_PATH}


build_nodejs_sdk:: gen_nodejs_sdk
	cd sdk/nodejs/ && \
		echo "module fake_nodejs_module // Exclude this directory from Go tools\n\ngo 1.17" > go.mod && \
		yarn install && \
		yarn run tsc --version && \
		yarn run tsc && \
		cp ../../README.md ../../LICENSE package.json yarn.lock ./bin/ && \
		sed -i.bak -e "s/\$${VERSION}/v$(VERSION)/g" ./bin/package.json && \
		rm ./bin/package.json.bak

install_nodejs_sdk:: build_nodejs_sdk
	yarn link --cwd ${WORKING_DIR}/sdk/nodejs/bin


# Python SDK

gen_python_sdk::
	rm -rf sdk/python
	cd provider/cmd/${CODEGEN} && go run . python ../../../sdk/python ${SCHEMA_PATH}
	cp ${WORKING_DIR}/README.md sdk/python

build_python_sdk:: gen_python_sdk
	cd sdk/python/ && \
		echo "module fake_python_module // Exclude this directory from Go tools\n\ngo 1.17" > go.mod && \
		python3 setup.py clean --all 2>/dev/null && \
		rm -rf ./bin/ ../python.bin/ && cp -R . ../python.bin && mv ../python.bin ./bin && \
		sed -i.bak -e 's/^VERSION = .*/VERSION = "$(VERSION)"/g' -e 's/^PLUGIN_VERSION = .*/PLUGIN_VERSION = "$(VERSION)"/g' ./bin/setup.py && \
		rm ./bin/setup.py.bak && \
		cd ./bin && python3 setup.py build sdist

# Java SDK
bin/pulumi-java-gen::
	mkdir -p bin/
	pulumictl download-binary -n pulumi-language-java -v $(JAVA_GEN_VERSION) -r pulumi/pulumi-java

gen_java_sdk:: bin/pulumi-java-gen
	rm -rf sdk/java
	$(WORKING_DIR)/bin/$(JAVA_GEN) generate --schema ${SCHEMA_PATH} --out sdk/java --build gradle-nexus

build_java_sdk:: PACKAGE_VERSION := $(VERSION)
build_java_sdk::
	cd sdk/java/ && \
		echo "module fake_java_module // Exclude this directory from Go tools\n\ngo 1.17" > go.mod && \
		gradle --console=plain build

# builds all providers required for publishing
dist:: PKG_ARGS := --no-bytecode --public-packages "*" --public
dist:: build_provider
	cd provider/cmd/${PROVIDER}/ && \
		yarn run pkg . ${PKG_ARGS} --target node16-macos-x64 --output ../../../bin/darwin-amd64/${PROVIDER} && \
		yarn run pkg . ${PKG_ARGS} --target node16-macos-arm64 --output ../../../bin/darwin-arm64/${PROVIDER} && \
		yarn run pkg . ${PKG_ARGS} --target node16-linuxstatic-x64 --output ../../../bin/linux-amd64/${PROVIDER} && \
		yarn run pkg . ${PKG_ARGS} --target node16-linuxstatic-arm64 --output ../../../bin/linux-arm64/${PROVIDER} && \
		yarn run pkg . ${PKG_ARGS} --target node16-win-x64 --output ../../../bin/windows-amd64/${PROVIDER}.exe
	mkdir -p dist
	tar --gzip -cf ./dist/pulumi-resource-${PACK}-v${VERSION}-linux-amd64.tar.gz README.md LICENSE -C bin/linux-amd64/ .
	tar --gzip -cf ./dist/pulumi-resource-${PACK}-v${VERSION}-linux-arm64.tar.gz README.md LICENSE -C bin/linux-arm64/ .
	tar --gzip -cf ./dist/pulumi-resource-${PACK}-v${VERSION}-darwin-amd64.tar.gz README.md LICENSE -C bin/darwin-amd64/ .
	tar --gzip -cf ./dist/pulumi-resource-${PACK}-v${VERSION}-darwin-arm64.tar.gz README.md LICENSE -C bin/darwin-arm64/ .
	tar --gzip -cf ./dist/pulumi-resource-${PACK}-v${VERSION}-windows-amd64.tar.gz README.md LICENSE -C bin/windows-amd64/ .

test:: PATH := $(WORKING_DIR)/bin:$(PATH)
test::
	@export PATH
	cd examples && go test -v -json -tags=all -timeout 2h . 2>&1 | tee /tmp/gotest.log | gotestfmt
