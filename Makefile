VERSION         := $(shell pulumictl get version)

PACK            := aws-apigateway
PROJECT         := github.com/pulumi/pulumi-${PACK}

PROVIDER        := pulumi-resource-${PACK}
CODEGEN         := pulumi-gen-${PACK}
VERSION_PATH    := provider/pkg/version.Version

WORKING_DIR     := $(shell pwd)
SCHEMA_PATH     := ${WORKING_DIR}/schema.yaml

generate:: gen_go_sdk gen_nodejs_sdk gen_python_sdk gen_dotnet_sdk

build:: build_provider build_nodejs_sdk build_python_sdk build_dotnet_sdk

install:: install_provider install_nodejs_sdk install_dotnet_sdk


# Provider

build_provider::
	cd provider/cmd/${PROVIDER}/ && \
		yarn install && \
		yarn run tsc --version && \
		yarn run tsc && \
		cp package.json yarn.lock ${PROVIDER} ${PROVIDER}.cmd PulumiPlugin.yaml ./bin/ && \
		sed -i.bak -e "s/\$${VERSION}/$(VERSION)/g" ./bin/package.json && \
		rm ./bin/package.json.bak

install_provider:: build_provider
	mkdir -p bin && rm -rf bin/*
	cp -a provider/cmd/${PROVIDER}/bin/. bin/
	cd provider/cmd/${PROVIDER}/ && cp ${PROVIDER} ${PROVIDER}.cmd PulumiPlugin.yaml ../../../bin/
	cd bin && yarn install
	chmod +x bin/${PROVIDER}


# Go SDK

gen_go_sdk::
	rm -rf go
	cd provider/cmd/${CODEGEN} && go run . go ../../../sdk/go ${SCHEMA_PATH}

build_go_sdk::

# .NET SDK

gen_dotnet_sdk::
	rm -rf sdk/dotnet
	cd provider/cmd/${CODEGEN} && go run . dotnet ../../../sdk/dotnet ${SCHEMA_PATH}

build_dotnet_sdk:: DOTNET_VERSION := $(shell pulumictl get version --language dotnet)
build_dotnet_sdk:: gen_dotnet_sdk
	cd sdk/dotnet/ && \
		echo "${DOTNET_VERSION}" >version.txt && \
		dotnet build /p:Version=${DOTNET_VERSION}

install_dotnet_sdk:: build_dotnet_sdk
	rm -rf ${WORKING_DIR}/nuget
	mkdir -p ${WORKING_DIR}/nuget
	find . -name '*.nupkg' -print -exec cp -p {} ${WORKING_DIR}/nuget \;


# Node.js SDK

gen_nodejs_sdk::
	rm -rf sdk/nodejs
	cd provider/cmd/${CODEGEN} && go run . nodejs ../../../sdk/nodejs ${SCHEMA_PATH}

build_nodejs_sdk:: VERSION := $(shell pulumictl get version --language javascript)
build_nodejs_sdk:: gen_nodejs_sdk
	cd sdk/nodejs/ && \
		yarn install && \
		yarn run tsc --version && \
		yarn run tsc && \
		cp ../../README.md ../../LICENSE package.json yarn.lock ./bin/ && \
		sed -i.bak -e "s/\$${VERSION}/$(VERSION)/g" ./bin/package.json && \
		rm ./bin/package.json.bak

install_nodejs_sdk:: build_nodejs_sdk
	yarn link --cwd ${WORKING_DIR}/sdk/nodejs/bin


# Python SDK

gen_python_sdk::
	rm -rf sdk/python
	cd provider/cmd/${CODEGEN} && go run . python ../../../sdk/python ${SCHEMA_PATH}
	cp ${WORKING_DIR}/README.md sdk/python

build_python_sdk:: PYPI_VERSION := $(shell pulumictl get version --language python)
build_python_sdk:: gen_python_sdk
	cd sdk/python/ && \
		python3 setup.py clean --all 2>/dev/null && \
		rm -rf ./bin/ ../python.bin/ && cp -R . ../python.bin && mv ../python.bin ./bin && \
		sed -i.bak -e 's/^VERSION = .*/VERSION = "$(PYPI_VERSION)"/g' -e 's/^PLUGIN_VERSION = .*/PLUGIN_VERSION = "$(VERSION)"/g' ./bin/setup.py && \
		rm ./bin/setup.py.bak && \
		cd ./bin && python3 setup.py build sdist

dist::
	mkdir dist
	tar --gzip --exclude yarn.lock --exclude pulumi-resource-${PACK}.cmd -cf ./dist/pulumi-resource-${PACK}-v${VERSION}-linux-amd64.tar.gz -C provider/cmd/pulumi-resource-aws-apigateway/bin/ .
	# the contents of the linux-arm64, darwin6-arm64 and darwin-amd64 packages are the same
	cp dist/pulumi-resource-${PACK}-v${VERSION}-linux-amd64.tar.gz dist/pulumi-resource-${PACK}-v${VERSION}-darwin-amd64.tar.gz
	cp dist/pulumi-resource-${PACK}-v${VERSION}-linux-amd64.tar.gz dist/pulumi-resource-${PACK}-v${VERSION}-darwin-arm64.tar.gz
	tar --gzip --exclude yarn.lock --exclude pulumi-resource-${PACK} -cf ./dist/pulumi-resource-${PACK}-v${VERSION}-windows-amd64.tar.gz -C provider/cmd/pulumi-resource-aws-apigateway/bin/ .

test::
	cd examples && go test -v -tags=all -timeout 2h
