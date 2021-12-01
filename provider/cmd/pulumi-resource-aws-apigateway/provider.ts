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
import * as provider from "@pulumi/pulumi/provider";

import { RestAPI, RestAPIArgs } from "./restAPI";

export class Provider implements provider.Provider {
    constructor(readonly version: string) { }

    async construct(name: string, type: string, inputs: pulumi.Inputs,
        options: pulumi.ComponentResourceOptions): Promise<provider.ConstructResult> {

        switch (type) {
            case "aws-apigateway:index:RestAPI":
                return await constructRestAPI(name, inputs, options);
            default:
                throw new Error(`unknown resource type ${type}`);
        }
    }
}

async function constructRestAPI(name: string, inputs: pulumi.Inputs,
    options: pulumi.ComponentResourceOptions): Promise<provider.ConstructResult> {

    // Create the component resource.
    const restAPI = new RestAPI(name, inputs as RestAPIArgs, options);

    // Return the component resource's URN and outputs as its state.
    return {
        urn: restAPI.urn,
        state: {
            url: restAPI.url,
            api: restAPI.api.apply(api => ({
                urn: api.urn,
                id: api.id,
                apiKeySource: api.apiKeySource,
                arn: api.arn,
                binaryMediaTypes: api.binaryMediaTypes,
                body: api.body,
                createdDate: api.createdDate,
                description: api.description,
                disableExecuteApiEndpoint: api.disableExecuteApiEndpoint,
                endpointConfiguration: api.endpointConfiguration,
                executionArn: api.executionArn,
                minimumCompressionSize: api.minimumCompressionSize,
                name: api.name,
                parameters: api.parameters,
                policy: api.policy,
                rootResourceId: api.rootResourceId,
                tags: api.tags,
                tagsAll: api.tagsAll,
            })),
            deployment: restAPI.deployment.apply(deployment => ({
                urn: deployment.urn,
                id: deployment.id,
                createdDate: deployment.createdDate,
                description: deployment.description,
                executionArn: deployment.executionArn,
                invokeUrl: deployment.invokeUrl,
                restApi: deployment.restApi,
                stageDescription: deployment.stageDescription,
                stageName: deployment.stageName,
                triggers: deployment.triggers,
                variables: deployment.variables,
            })),
            stage: restAPI.stage.apply(stage => ({
                urn: stage.urn,
                id: stage.id,
                accessLogSettings: stage.accessLogSettings,
                arn: stage.arn,
                cacheClusterEnabled: stage.cacheClusterEnabled,
                cacheClusterSize: stage.cacheClusterSize,
                clientCertificateId: stage.clientCertificateId,
                deployment: stage.deployment,
                description: stage.description,
                documentationVersion: stage.documentationVersion,
                executionArn: stage.executionArn,
                invokeUrl: stage.invokeUrl,
                restApi: stage.restApi,
                stageName: stage.stageName,
                tags: stage.tags,
                tagsAll: stage.tagsAll,
                variables: stage.variables,
                xrayTracingEnabled: stage.xrayTracingEnabled,
            })),
            apiPolicy: restAPI.apiPolicy?.apply(apiPolicy => ({
                urn: apiPolicy?.urn,
                id: apiPolicy?.id,
                policy: apiPolicy?.policy,
                restApiId: apiPolicy?.restApiId,
            })),
        },
    };
}
