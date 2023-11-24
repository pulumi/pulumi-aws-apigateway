// Copyright 2023, Pulumi Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";
import * as data from "./data";

const f = new aws.lambda.CallbackFunction("f", {
  callback: async (ev, ctx) => {
    console.log(JSON.stringify(ev));
    return {
      statusCode: 200,
      body: "goodbye",
    };
  },
});

const api = new apigateway.RestAPI("authorizer-api", {
  apiKeySource: data.apikeysource,
  routes: [{
    path: "/",
    method: "GET",
    eventHandler: f,
  }],
}, { version: "" });


// TODO[pulumi/pulumi-aws-apigateway#111]: The `api` output is (incorrectly) a string not an object
// so we cannot read it's output.  Workaround this by looking up the API by name.
var apiRead: any = {};
if (!pulumi.runtime.isDryRun()) {
  apiRead = aws.apigateway.getRestApiOutput({
    name: api.url.apply(_ => "authorizer-api"),
  });
}
export const apiKeySource = apiRead.apiKeySource;