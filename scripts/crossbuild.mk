# Provider cross-platform build & packaging

# Set these variables to enable signing of the windows binary
AZURE_SIGNING_CLIENT_ID ?=
AZURE_SIGNING_CLIENT_SECRET ?=
AZURE_SIGNING_TENANT_ID ?=
AZURE_SIGNING_KEY_VAULT_URI ?=
SKIP_SIGNING ?=

# These targets assume that the schema-embed.json exists - it's generated by tfgen.
# We disable CGO to ensure that the binary is statically linked.
bin/linux-amd64/$(PROVIDER): GOOS := linux
bin/linux-amd64/$(PROVIDER): GOARCH := amd64
bin/linux-arm64/$(PROVIDER): GOOS := linux
bin/linux-arm64/$(PROVIDER): GOARCH := arm64
bin/darwin-amd64/$(PROVIDER): GOOS := darwin
bin/darwin-amd64/$(PROVIDER): GOARCH := amd64
bin/darwin-arm64/$(PROVIDER): GOOS := darwin
bin/darwin-arm64/$(PROVIDER): GOARCH := arm64
bin/windows-amd64/$(PROVIDER).exe: GOOS := windows
bin/windows-amd64/$(PROVIDER).exe: GOARCH := amd64
bin/%/$(PROVIDER) bin/%/$(PROVIDER).exe: bin/jsign-6.0.jar
	$(call build_provider_cmd,$(GOOS),$(GOARCH),$(WORKING_DIR)/$@)

	@# Only sign windows binary if fully configured.
	@# Test variables set by joining with | between and looking for || showing at least one variable is empty.
	@# Move the binary to a temporary location and sign it there to avoid the target being up-to-date if signing fails.
	@set -e; \
	if [[ "${GOOS}-${GOARCH}" = "windows-amd64" && "${SKIP_SIGNING}" != "true" ]]; then \
		if [[ "|${AZURE_SIGNING_CLIENT_ID}|${AZURE_SIGNING_CLIENT_SECRET}|${AZURE_SIGNING_TENANT_ID}|${AZURE_SIGNING_KEY_VAULT_URI}|" == *"||"* ]]; then \
			echo "Can't sign windows binaries as required configuration not set: AZURE_SIGNING_CLIENT_ID, AZURE_SIGNING_CLIENT_SECRET, AZURE_SIGNING_TENANT_ID, AZURE_SIGNING_KEY_VAULT_URI"; \
			echo "To rebuild with signing delete the unsigned $@ and rebuild with the fixed configuration"; \
			if [[ "${CI}" == "true" ]]; then exit 1; fi; \
		else \
			mv $@ $@.unsigned; \
			az login --service-principal \
				--username "${AZURE_SIGNING_CLIENT_ID}" \
				--password "${AZURE_SIGNING_CLIENT_SECRET}" \
				--tenant "${AZURE_SIGNING_TENANT_ID}" \
				--output none; \
			ACCESS_TOKEN=$$(az account get-access-token --resource "https://vault.azure.net" | jq -r .accessToken); \
			java -jar bin/jsign-6.0.jar \
				--storetype AZUREKEYVAULT \
				--keystore "PulumiCodeSigning" \
				--url "${AZURE_SIGNING_KEY_VAULT_URI}" \
				--storepass "$${ACCESS_TOKEN}" \
				$@.unsigned; \
			mv $@.unsigned $@; \
			az logout; \
		fi; \
	fi

bin/jsign-6.0.jar:
	wget https://github.com/ebourg/jsign/releases/download/6.0/jsign-6.0.jar --output-document=bin/jsign-6.0.jar

provider-linux-amd64: bin/linux-amd64/$(PROVIDER)
provider-linux-arm64: bin/linux-arm64/$(PROVIDER)
provider-darwin-amd64: bin/darwin-amd64/$(PROVIDER)
provider-darwin-arm64: bin/darwin-arm64/$(PROVIDER)
provider-windows-amd64: bin/windows-amd64/$(PROVIDER).exe
.PHONY: provider-linux-amd64 provider-linux-arm64 provider-darwin-amd64 provider-darwin-arm64 provider-windows-amd64

bin/$(PROVIDER)-v$(PROVIDER_VERSION)-linux-amd64.tar.gz: bin/linux-amd64/$(PROVIDER)
bin/$(PROVIDER)-v$(PROVIDER_VERSION)-linux-arm64.tar.gz: bin/linux-arm64/$(PROVIDER)
bin/$(PROVIDER)-v$(PROVIDER_VERSION)-darwin-amd64.tar.gz: bin/darwin-amd64/$(PROVIDER)
bin/$(PROVIDER)-v$(PROVIDER_VERSION)-darwin-arm64.tar.gz: bin/darwin-arm64/$(PROVIDER)
bin/$(PROVIDER)-v$(PROVIDER_VERSION)-windows-amd64.tar.gz: bin/windows-amd64/$(PROVIDER).exe
bin/$(PROVIDER)-v$(PROVIDER_VERSION)-%.tar.gz:
	@mkdir -p dist
	@# $< is the last dependency (the binary path from above) e.g. bin/linux-amd64/pulumi-resource-xyz
	@# $@ is the current target e.g. bin/pulumi-resource-xyz-v1.2.3-linux-amd64.tar.gz
	tar --gzip -cf $@ README.md LICENSE -C $$(dirname $<) .

provider_dist-linux-amd64: bin/$(PROVIDER)-v$(PROVIDER_VERSION)-linux-amd64.tar.gz
provider_dist-linux-arm64: bin/$(PROVIDER)-v$(PROVIDER_VERSION)-linux-arm64.tar.gz
provider_dist-darwin-amd64: bin/$(PROVIDER)-v$(PROVIDER_VERSION)-darwin-amd64.tar.gz
provider_dist-darwin-arm64: bin/$(PROVIDER)-v$(PROVIDER_VERSION)-darwin-arm64.tar.gz
provider_dist-windows-amd64: bin/$(PROVIDER)-v$(PROVIDER_VERSION)-windows-amd64.tar.gz
provider_dist: provider_dist-linux-amd64 provider_dist-linux-arm64 provider_dist-darwin-amd64 provider_dist-darwin-arm64 provider_dist-windows-amd64
.PHONY: provider_dist-linux-amd64 provider_dist-linux-arm64 provider_dist-darwin-amd64 provider_dist-darwin-arm64 provider_dist-windows-amd64 provider_dist
