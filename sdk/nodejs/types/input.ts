// *** WARNING: this file was generated by pulumi-language-nodejs. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as inputs from "../types/input";
import * as outputs from "../types/output";
import * as enums from "../types/enums";

import * as pulumiAws from "@pulumi/aws";

/**
 * LambdaAuthorizer provides the definition for a custom Authorizer for API Gateway.
 */
export interface AuthorizerArgs {
    /**
     * Specifies the authorization mechanism for the client. Typical values are "oauth2" or "custom".
     */
    authType?: string;
    /**
     * The name for the Authorizer to be referenced as. This must be unique for each unique
     * authorizer within the API. If no name if specified, a name will be generated for you.
     */
    authorizerName?: string;
    /**
     * The number of seconds during which the resulting IAM policy is cached. Default is 300s. You
     * can set this value to 0 to disable caching. Max value is 3600s. Note - if you are sharing an
     * authorizer across more than one route you will want to disable the cache or else it will
     * cause problems for you.
     */
    authorizerResultTtlInSeconds?: number;
    /**
     * The authorizerHandler specifies information about the authorizing Lambda.
     */
    handler?: pulumi.Input<pulumiAws.lambda.Function>;
    /**
     * List of mapping expressions of the request parameters as the identity source. This indicates
     * where in the request identity information is expected. Applicable for the authorizer of the
     * "request" type only. Example: ["method.request.header.HeaderAuth1",
     * "method.request.querystring.QueryString1"]
     */
    identitySource?: string[];
    /**
     * A regular expression for validating the token as the incoming identity. It only invokes the
     * authorizer's lambda if there is a match, else it will return a 401. This does not apply to
     * REQUEST Lambda Authorizers. Example: "^x-[a-z]+".
     */
    identityValidationExpression?: string;
    /**
     * For method authorization, you can define resource servers and custom scopes by specifying the
     * "resource-server/scope". e.g. ["com.hamuta.movies/drama.view",
     * "http://my.resource.com/file.read"] For more information on resource servers and custom
     * scopes visit the AWS documentation -
     * https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-define-resource-servers.html
     */
    methodsToAuthorize?: string[];
    /**
     * Defines where in the request API Gateway should look for identity information. The value must
     * be "header" or "query". If there are multiple identity sources, the value must be "header".
     */
    parameterLocation?: string;
    /**
     * parameterName is the name of the header or query parameter containing the authorization
     * token. Must be "Unused" for multiple identity sources.
     */
    parameterName: string;
    /**
     * The ARNs of the Cognito User Pools to use.
     */
    providerARNs?: pulumi.Input<string>[];
    /**
     * The type of the authorizer. This value must be one of the following:
     * - "token", for an authorizer with the caller identity embedded in an authorization token
     * - "request", for an authorizer with the caller identity contained in request parameters
     */
    type?: string;
}

export interface RequiredParameterArgs {
    in?: pulumi.Input<string>;
    name?: pulumi.Input<string>;
}

/**
 * A route that that APIGateway should accept and forward to some type of destination. All routes
 * have an incoming path that they match against.  However, destinations are determined by the kind
 * of the route.
 */
export interface RouteArgs {
    /**
     * If true, an API key will be required for this route. The source for the API Key can be set at
     * the API level and by default, the source will be the HEADER.
     */
    apiKeyRequired?: boolean;
    /**
     * Authorizers allows you to define Lambda authorizers be applied for authorization when the
     * the route is called.
     */
    authorizers?: inputs.AuthorizerArgs[];
    /**
     * The `content-type` to serve the file as.  Only valid when `localPath` points to a file.  If
     * `localPath` points to a directory, the content types for all files will be inferred.
     */
    contentType?: string;
    /**
     * A raw Swagger object to include verbatim in the integration for this path.
     */
    data?: any;
    /**
     * A Lambda function which will handle the route for the given path and method.
     */
    eventHandler?: pulumi.Input<pulumiAws.lambda.Function>;
    /**
     * By default, the route method auth type is set to `NONE`. If true, the auth type will be
     * set to `AWS_IAM`.
     */
    iamAuthEnabled?: boolean;
    /**
     * By default a `localPath` hosting static content will also serve 'index.html' in response to a request on a directory.
     * To disable this pass `false` or supply a new index document name.
     */
    index?: string | boolean;
    /**
     * The local path on disk to create static S3 resources for.  Files will be uploaded into S3
     * objects, and directories will be recursively walked into.
     */
    localPath?: string;
    /**
     * The REST method of the route to match.  Only valid with `eventHandler` or `data` routes.
     */
    method?: enums.Method;
    /**
     * The path on the API that will serve this route.  If not prefixed with `/`,
     * then a `/` will be added automatically to the beginning.
     */
    path: string;
    /**
     * Request Validator specifies the validator to use at the method level. This will override anything
     * defined at the API level.
     */
    requestValidator?: enums.RequestValidator;
    /**
     * Required Parameters to validate. If the request validator is set to ALL or PARAMS_ONLY, api
     * gateway will validate these before sending traffic to the event handler.
     */
    requiredParameters?: inputs.RequiredParameterArgs[];
    /**
     * The target for an integration route (see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html).
     */
    target?: pulumi.Input<inputs.TargetArgs>;
}

export interface SwaggerGatewayResponseArgs {
    responseParameters?: pulumi.Input<{[key: string]: pulumi.Input<string>}>;
    responseTemplates?: pulumi.Input<{[key: string]: pulumi.Input<string>}>;
    statusCode?: pulumi.Input<number>;
}

export interface TargetArgs {
    /**
     * The (id) of the VpcLink used for the integration when connectionType=VPC_LINK and undefined,
     * otherwise.
     */
    connectionId?: pulumi.Input<string>;
    /**
     * The type of the network connection to the integration endpoint. The valid value is `INTERNET`
     * for connections through the public routable internet or `VPC_LINK` for private connections
     * between API Gateway and a network load balancer in a VPC. The default value is `INTERNET`.
     */
    connectionType?: pulumi.Input<enums.IntegrationConnectionType>;
    /**
     * Specifies the integration's HTTP method type.  Currently, the only supported type is 'ANY'.
     */
    httpMethod?: pulumi.Input<"ANY">;
    /**
     * Specifies how the method request body of an unmapped content type will be passed through the
     * integration request to the back end without transformation.
     *
     * The valid value is one of the following:
     *
     * * `WHEN_NO_MATCH`: passes the method request body through the integration request to the back end
     * without transformation when the method request content type does not match any content type
     * associated with the mapping templates defined in the integration request.
     *
     * * `WHEN_NO_TEMPLATES`: passes the method request body through the integration request to the back
     * end without transformation when no mapping template is defined in the integration request. If
     * a template is defined when this option is selected, the method request of an unmapped
     * content-type will be rejected with an HTTP 415 Unsupported Media Type response.
     *
     * * `NEVER`: rejects the method request with an HTTP 415 Unsupported Media Type response when
     * either the method request content type does not match any content type associated with the
     * mapping templates defined in the integration request or no mapping template is defined in the
     * integration request.
     *
     * Defaults to `WHEN_NO_MATCH` if unspecified.
     */
    passthroughBehaviour?: pulumi.Input<enums.IntegrationPassthroughBehavior>;
    /**
     * Specifies an API method integration type. The valid value is one of the following:
     *
     * * `aws`: for integrating the API method request with an AWS service action, including the Lambda
     * function-invoking action. With the Lambda function-invoking action, this is referred to as
     * the Lambda custom integration. With any other AWS service action, this is known as AWS
     * integration.
     *
     * * `aws_proxy`: for integrating the API method request with the Lambda function-invoking action
     * with the client request passed through as-is. This integration is also referred to as the
     * Lambda proxy integration.
     *
     * * `http`: for integrating the API method request with an HTTP endpoint, including a private HTTP
     * endpoint within a VPC. This integration is also referred to as the HTTP custom integration.
     *
     * * `http_proxy`: for integrating the API method request with an HTTP endpoint, including a private
     * HTTP endpoint within a VPC, with the client request passed through as-is. This is also
     * referred to as the HTTP proxy integration.
     *
     * * `mock`: for integrating the API method request with API Gateway as a "loop-back" endpoint
     * without invoking any backend.
     */
    type: pulumi.Input<enums.IntegrationType>;
    /**
     * Specifies Uniform Resource Identifier (URI) of the integration endpoint.
     *
     * For HTTP or HTTP_PROXY integrations, the URI must be a fully formed, encoded HTTP(S) URL
     * according to the RFC-3986 specification, for either standard integration, where
     * connectionType is not VPC_LINK, or private integration, where connectionType is VPC_LINK. For
     * a private HTTP integration, the URI is not used for routing.
     *
     * For AWS or AWS_PROXY integrations, the URI is of the form
     * arn:aws:apigateway:{region}:{subdomain.service|service}:path|action/{service_api}. Here,
     * {Region} is the API Gateway region (e.g., us-east-1); {service} is the name of the integrated
     * AWS service (e.g., s3); and {subdomain} is a designated subdomain supported by certain AWS
     * service for fast host-name lookup. action can be used for an AWS service action-based API,
     * using an Action={name}&{p1}={v1}&p2={v2}... query string. The ensuing {service_api} refers to
     * a supported action {name} plus any required input parameters. Alternatively, path can be used
     * for an AWS service path-based API. The ensuing service_api refers to the path to an AWS
     * service resource, including the region of the integrated AWS service, if applicable. For
     * example, for integration with the S3 API of GetObject, the uri can be either
     * arn:aws:apigateway:us-west-2:s3:action/GetObject&Bucket={bucket}&Key={key} or
     * arn:aws:apigateway:us-west-2:s3:path/{bucket}/{key}.
     */
    uri?: pulumi.Input<string>;
}
