#!/usr/bin/env bash

set -euo pipefail

make generate_sdks
yarn --cwd aws-apigateway install --frozen-lockfile
yarn --cwd aws-apigateway dedupe-deps