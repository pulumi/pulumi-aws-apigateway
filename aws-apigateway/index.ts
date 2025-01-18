// Copyright 2016-2021, Pulumi Corporation.
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

import * as pulumi from "@pulumi/pulumi";
import { readFileSync } from "fs";
import { Provider } from "./provider";
import { parse } from "yaml";

function main(args: string[]) {
  const file = readFileSync(require.resolve("./schema.yaml"), "utf8");
  const schema = JSON.stringify(parse(file));
  let version: string = require("./package.json").version;
  // Node allows for the version to be prefixed by a "v",
  // while semver doesn't. If there is a v, strip it off.
  if (version.startsWith("v")) {
    version = version.slice(1);
  }
  const provider = new Provider(version, schema);
  return pulumi.provider.main(provider, args);
}

main(process.argv.slice(2));
