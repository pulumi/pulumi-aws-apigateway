// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***


export const APIKeySource = {
    HEADER: "HEADER",
    AUTHORIZER: "AUTHORIZER",
} as const;

export type APIKeySource = (typeof APIKeySource)[keyof typeof APIKeySource];

export const IntegrationConnectionType = {
    INTERNET: "INTERNET",
    VPC_LINK: "VPC_LINK",
} as const;

export type IntegrationConnectionType = (typeof IntegrationConnectionType)[keyof typeof IntegrationConnectionType];

export const IntegrationPassthroughBehavior = {
    When_no_match: "when_no_match",
    When_no_templates: "when_no_templates",
    Never: "never",
} as const;

export type IntegrationPassthroughBehavior = (typeof IntegrationPassthroughBehavior)[keyof typeof IntegrationPassthroughBehavior];

export const IntegrationType = {
    Aws: "aws",
    Aws_proxy: "aws_proxy",
    Http: "http",
    Http_proxy: "http_proxy",
    Mock: "mock",
} as const;

export type IntegrationType = (typeof IntegrationType)[keyof typeof IntegrationType];

export const Method = {
    ANY: "ANY",
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
    PATCH: "PATCH",
    OPTIONS: "OPTIONS",
    HEAD: "HEAD",
} as const;

export type Method = (typeof Method)[keyof typeof Method];

export const RequestValidator = {
    ALL: "ALL",
    PARAMS_ONLY: "PARAMS_ONLY",
    BODY_ONLY: "BODY_ONLY",
} as const;

export type RequestValidator = (typeof RequestValidator)[keyof typeof RequestValidator];
