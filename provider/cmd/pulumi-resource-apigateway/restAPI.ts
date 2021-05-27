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
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

export interface RestAPIRoute {
    function: aws.lambda.Function;
    method: pulumi.Input<string>;
    path: pulumi.Input<string>;
}

export interface RestAPIArgs {
    routes: pulumi.Input<pulumi.Input<RestAPIRoute>[]>;
}

export class RestAPI extends pulumi.ComponentResource {
    public readonly url: pulumi.Output<string>;

    constructor(name: string, args: RestAPIArgs, opts?: pulumi.ComponentResourceOptions) {
        super("apigateway:index:RestAPI", name, args, opts);
        
        // TODO[pulumi/pulumi#7150]: Config doesn't work inside multi-lang components so we have to hardcode :-(
        aws.config.region = "ap-southeast-2";

        const api = pulumi.output(args.routes).apply(routes => {
            return new awsx.apigateway.API(name, {
                routes: routes.map(route => {
                    return {
                        path: route.path,
                        method: route.method as awsx.apigateway.Method,
                        eventHandler: route.function,
                    }
                }),
            }, { parent: this });
        });

        this.url = api.url;

        this.registerOutputs({
            url: api.url,
        });
    }
}
