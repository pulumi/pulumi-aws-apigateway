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

// TODO: A bit of a shame we have to copy all this here - since it is intended to match both of 
// what's in `schema.json` and what's used in `awsx`.  It may be easier to just use `awsx` types
// directly here even though they don't necessarily match the actual values we'll get?

// TODO: Should this be broken up into subtypes for the mutually exclusive allowed structures?
export interface RestAPIRoute /* extends BaseRoute */ {
    eventHandler: aws.lambda.Function;
    method: Method;
    path: string;

    localPath: string;
    contentType: pulumi.Input<string>;
    index: string | boolean;

    data: any;

    target: pulumi.Input<IntegrationTarget>;

    // TODO: BaseRoute properties
    // requiredParameters?: reqvalidation.Parameter[];
    // requestValidator?: RequestValidator;
    // apiKeyRequired?: boolean;
    // authorizers?: Authorizer[] | Authorizer;
    // iamAuthEnabled?: boolean;

}

export interface IntegrationTarget {
    type: pulumi.Input<IntegrationType>;
    httpMethod?: "ANY";
    uri: pulumi.Input<string>;
    connectionType?: pulumi.Input<IntegrationConnectionType>;
    connectionId?: pulumi.Input<string>;
    passthroughBehavior?: pulumi.Input<IntegrationPassthroughBehavior>;
}

export interface SwaggerGatewayResponse {
    statusCode: number;
    responseTemplates: { "application/json": string };
    responseParameters: { [key: string]: string };
}

export declare type Method = "ANY" | "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "OPTIONS";
export declare type RequestValidator = "ALL" | "PARAMS_ONLY" | "BODY_ONLY";
export declare type APIKeySource = "HEADER" | "AUTHORIZER";
export declare type IntegrationConnectionType = "INTERNET" | "VPC_LINK";
export declare type IntegrationType = "aws" | "aws_proxy" | "http" | "http_proxy" | "mock";
export declare type IntegrationPassthroughBehavior = "when_no_match" | "when_no_templates" | "never";


export interface RestAPIArgs {
    routes:RestAPIRoute[];
    swaggerString: pulumi.Input<string>;
    stageName: pulumi.Input<string>;
    requestValidator: RequestValidator;
    apiKeySource: APIKeySource;
    staticRoutesBucket: aws.s3.Bucket;
    gatewayResponses: { [key: string]: SwaggerGatewayResponse };
}

export class RestAPI extends pulumi.ComponentResource {
    public readonly url: pulumi.Output<string>;
    public readonly api: pulumi.Output<aws.apigateway.RestApi>;
    public readonly deployment: pulumi.Output<aws.apigateway.Deployment>;
    public readonly stage: pulumi.Output<aws.apigateway.Stage>;
    public readonly apiPolicy?: pulumi.Output<aws.apigateway.RestApiPolicy | undefined>;

    constructor(name: string, args: RestAPIArgs, opts?: pulumi.ComponentResourceOptions) {
        super("apigateway:index:RestAPI", name, args, opts);

        // TODO[pulumi/pulumi#6957]: Ideally `routes` would be a plainInput so this `apply` wasn't needed.
        const api = pulumi.output(args.routes).apply(routes => {
            return new awsx.apigateway.API(name, {
                routes: routes,
                swaggerString: args.swaggerString,
                stageName: args.stageName,
                requestValidator: args.requestValidator,
                apiKeySource: args.apiKeySource,
                staticRoutesBucket: args.staticRoutesBucket,
                gatewayResponses: args.gatewayResponses,
            }, { parent: this });
        });

        this.url = api.url;
        this.api = api.restAPI;
        this.deployment = api.deployment;
        this.stage = api.stage;
        this.apiPolicy = api.apiPolicy;

        this.registerOutputs({
            url: api.url,
        });
    }
}
