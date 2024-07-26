# coding=utf-8
# *** WARNING: this file was generated by pulumi-language-python. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import copy
import warnings
import pulumi
import pulumi.runtime
from typing import Any, Mapping, Optional, Sequence, Union, overload
from . import _utilities
from ._enums import *
import pulumi_aws

__all__ = [
    'AuthorizerArgs',
    'RequiredParameterArgs',
    'RouteArgs',
    'SwaggerGatewayResponseArgs',
    'TargetArgs',
]

@pulumi.input_type
class AuthorizerArgs:
    def __init__(__self__, *,
                 parameter_name: str,
                 auth_type: Optional[str] = None,
                 authorizer_name: Optional[str] = None,
                 authorizer_result_ttl_in_seconds: Optional[float] = None,
                 handler: Optional[pulumi.Input['pulumi_aws.lambda_.Function']] = None,
                 identity_source: Optional[Sequence[str]] = None,
                 identity_validation_expression: Optional[str] = None,
                 methods_to_authorize: Optional[Sequence[str]] = None,
                 parameter_location: Optional[str] = None,
                 provider_arns: Optional[Sequence[pulumi.Input[str]]] = None,
                 type: Optional[str] = None):
        """
        LambdaAuthorizer provides the definition for a custom Authorizer for API Gateway.

        :param str parameter_name: parameterName is the name of the header or query parameter containing the authorization
               token. Must be "Unused" for multiple identity sources.
        :param str auth_type: Specifies the authorization mechanism for the client. Typical values are "oauth2" or "custom".
        :param str authorizer_name: The name for the Authorizer to be referenced as. This must be unique for each unique
               authorizer within the API. If no name if specified, a name will be generated for you.
        :param float authorizer_result_ttl_in_seconds: The number of seconds during which the resulting IAM policy is cached. Default is 300s. You
               can set this value to 0 to disable caching. Max value is 3600s. Note - if you are sharing an
               authorizer across more than one route you will want to disable the cache or else it will
               cause problems for you.
        :param pulumi.Input['pulumi_aws.lambda_.Function'] handler: The authorizerHandler specifies information about the authorizing Lambda.
        :param Sequence[str] identity_source: List of mapping expressions of the request parameters as the identity source. This indicates
               where in the request identity information is expected. Applicable for the authorizer of the
               "request" type only. Example: ["method.request.header.HeaderAuth1",
               "method.request.querystring.QueryString1"]
        :param str identity_validation_expression: A regular expression for validating the token as the incoming identity. It only invokes the
               authorizer's lambda if there is a match, else it will return a 401. This does not apply to
               REQUEST Lambda Authorizers. Example: "^x-[a-z]+".
        :param Sequence[str] methods_to_authorize: For method authorization, you can define resource servers and custom scopes by specifying the
               "resource-server/scope". e.g. ["com.hamuta.movies/drama.view",
               "http://my.resource.com/file.read"] For more information on resource servers and custom
               scopes visit the AWS documentation -
               https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-define-resource-servers.html
        :param str parameter_location: Defines where in the request API Gateway should look for identity information. The value must
               be "header" or "query". If there are multiple identity sources, the value must be "header".
        :param Sequence[pulumi.Input[str]] provider_arns: The ARNs of the Cognito User Pools to use.
        :param str type: The type of the authorizer. This value must be one of the following:
               - "token", for an authorizer with the caller identity embedded in an authorization token
               - "request", for an authorizer with the caller identity contained in request parameters
        """
        pulumi.set(__self__, "parameter_name", parameter_name)
        if auth_type is not None:
            pulumi.set(__self__, "auth_type", auth_type)
        if authorizer_name is not None:
            pulumi.set(__self__, "authorizer_name", authorizer_name)
        if authorizer_result_ttl_in_seconds is not None:
            pulumi.set(__self__, "authorizer_result_ttl_in_seconds", authorizer_result_ttl_in_seconds)
        if handler is not None:
            pulumi.set(__self__, "handler", handler)
        if identity_source is not None:
            pulumi.set(__self__, "identity_source", identity_source)
        if identity_validation_expression is not None:
            pulumi.set(__self__, "identity_validation_expression", identity_validation_expression)
        if methods_to_authorize is not None:
            pulumi.set(__self__, "methods_to_authorize", methods_to_authorize)
        if parameter_location is not None:
            pulumi.set(__self__, "parameter_location", parameter_location)
        if provider_arns is not None:
            pulumi.set(__self__, "provider_arns", provider_arns)
        if type is not None:
            pulumi.set(__self__, "type", type)

    @property
    @pulumi.getter(name="parameterName")
    def parameter_name(self) -> str:
        """
        parameterName is the name of the header or query parameter containing the authorization
        token. Must be "Unused" for multiple identity sources.
        """
        return pulumi.get(self, "parameter_name")

    @parameter_name.setter
    def parameter_name(self, value: str):
        pulumi.set(self, "parameter_name", value)

    @property
    @pulumi.getter(name="authType")
    def auth_type(self) -> Optional[str]:
        """
        Specifies the authorization mechanism for the client. Typical values are "oauth2" or "custom".
        """
        return pulumi.get(self, "auth_type")

    @auth_type.setter
    def auth_type(self, value: Optional[str]):
        pulumi.set(self, "auth_type", value)

    @property
    @pulumi.getter(name="authorizerName")
    def authorizer_name(self) -> Optional[str]:
        """
        The name for the Authorizer to be referenced as. This must be unique for each unique
        authorizer within the API. If no name if specified, a name will be generated for you.
        """
        return pulumi.get(self, "authorizer_name")

    @authorizer_name.setter
    def authorizer_name(self, value: Optional[str]):
        pulumi.set(self, "authorizer_name", value)

    @property
    @pulumi.getter(name="authorizerResultTtlInSeconds")
    def authorizer_result_ttl_in_seconds(self) -> Optional[float]:
        """
        The number of seconds during which the resulting IAM policy is cached. Default is 300s. You
        can set this value to 0 to disable caching. Max value is 3600s. Note - if you are sharing an
        authorizer across more than one route you will want to disable the cache or else it will
        cause problems for you.
        """
        return pulumi.get(self, "authorizer_result_ttl_in_seconds")

    @authorizer_result_ttl_in_seconds.setter
    def authorizer_result_ttl_in_seconds(self, value: Optional[float]):
        pulumi.set(self, "authorizer_result_ttl_in_seconds", value)

    @property
    @pulumi.getter
    def handler(self) -> Optional[pulumi.Input['pulumi_aws.lambda_.Function']]:
        """
        The authorizerHandler specifies information about the authorizing Lambda.
        """
        return pulumi.get(self, "handler")

    @handler.setter
    def handler(self, value: Optional[pulumi.Input['pulumi_aws.lambda_.Function']]):
        pulumi.set(self, "handler", value)

    @property
    @pulumi.getter(name="identitySource")
    def identity_source(self) -> Optional[Sequence[str]]:
        """
        List of mapping expressions of the request parameters as the identity source. This indicates
        where in the request identity information is expected. Applicable for the authorizer of the
        "request" type only. Example: ["method.request.header.HeaderAuth1",
        "method.request.querystring.QueryString1"]
        """
        return pulumi.get(self, "identity_source")

    @identity_source.setter
    def identity_source(self, value: Optional[Sequence[str]]):
        pulumi.set(self, "identity_source", value)

    @property
    @pulumi.getter(name="identityValidationExpression")
    def identity_validation_expression(self) -> Optional[str]:
        """
        A regular expression for validating the token as the incoming identity. It only invokes the
        authorizer's lambda if there is a match, else it will return a 401. This does not apply to
        REQUEST Lambda Authorizers. Example: "^x-[a-z]+".
        """
        return pulumi.get(self, "identity_validation_expression")

    @identity_validation_expression.setter
    def identity_validation_expression(self, value: Optional[str]):
        pulumi.set(self, "identity_validation_expression", value)

    @property
    @pulumi.getter(name="methodsToAuthorize")
    def methods_to_authorize(self) -> Optional[Sequence[str]]:
        """
        For method authorization, you can define resource servers and custom scopes by specifying the
        "resource-server/scope". e.g. ["com.hamuta.movies/drama.view",
        "http://my.resource.com/file.read"] For more information on resource servers and custom
        scopes visit the AWS documentation -
        https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-define-resource-servers.html
        """
        return pulumi.get(self, "methods_to_authorize")

    @methods_to_authorize.setter
    def methods_to_authorize(self, value: Optional[Sequence[str]]):
        pulumi.set(self, "methods_to_authorize", value)

    @property
    @pulumi.getter(name="parameterLocation")
    def parameter_location(self) -> Optional[str]:
        """
        Defines where in the request API Gateway should look for identity information. The value must
        be "header" or "query". If there are multiple identity sources, the value must be "header".
        """
        return pulumi.get(self, "parameter_location")

    @parameter_location.setter
    def parameter_location(self, value: Optional[str]):
        pulumi.set(self, "parameter_location", value)

    @property
    @pulumi.getter(name="providerARNs")
    def provider_arns(self) -> Optional[Sequence[pulumi.Input[str]]]:
        """
        The ARNs of the Cognito User Pools to use.
        """
        return pulumi.get(self, "provider_arns")

    @provider_arns.setter
    def provider_arns(self, value: Optional[Sequence[pulumi.Input[str]]]):
        pulumi.set(self, "provider_arns", value)

    @property
    @pulumi.getter
    def type(self) -> Optional[str]:
        """
        The type of the authorizer. This value must be one of the following:
        - "token", for an authorizer with the caller identity embedded in an authorization token
        - "request", for an authorizer with the caller identity contained in request parameters
        """
        return pulumi.get(self, "type")

    @type.setter
    def type(self, value: Optional[str]):
        pulumi.set(self, "type", value)


@pulumi.input_type
class RequiredParameterArgs:
    def __init__(__self__, *,
                 in_: Optional[pulumi.Input[str]] = None,
                 name: Optional[pulumi.Input[str]] = None):
        if in_ is not None:
            pulumi.set(__self__, "in_", in_)
        if name is not None:
            pulumi.set(__self__, "name", name)

    @property
    @pulumi.getter(name="in")
    def in_(self) -> Optional[pulumi.Input[str]]:
        return pulumi.get(self, "in_")

    @in_.setter
    def in_(self, value: Optional[pulumi.Input[str]]):
        pulumi.set(self, "in_", value)

    @property
    @pulumi.getter
    def name(self) -> Optional[pulumi.Input[str]]:
        return pulumi.get(self, "name")

    @name.setter
    def name(self, value: Optional[pulumi.Input[str]]):
        pulumi.set(self, "name", value)


@pulumi.input_type
class RouteArgs:
    def __init__(__self__, *,
                 path: str,
                 api_key_required: Optional[bool] = None,
                 authorizers: Optional[Sequence['AuthorizerArgs']] = None,
                 content_type: Optional[str] = None,
                 data: Optional[Any] = None,
                 event_handler: Optional[pulumi.Input['pulumi_aws.lambda_.Function']] = None,
                 iam_auth_enabled: Optional[bool] = None,
                 index: Optional[Union[str, bool]] = None,
                 local_path: Optional[str] = None,
                 method: Optional['Method'] = None,
                 request_validator: Optional['RequestValidator'] = None,
                 required_parameters: Optional[Sequence['RequiredParameterArgs']] = None,
                 target: Optional[pulumi.Input['TargetArgs']] = None):
        """
        A route that that APIGateway should accept and forward to some type of destination. All routes
        have an incoming path that they match against.  However, destinations are determined by the kind
        of the route.

        :param str path: The path on the API that will serve this route.  If not prefixed with `/`,
               then a `/` will be added automatically to the beginning.
        :param bool api_key_required: If true, an API key will be required for this route. The source for the API Key can be set at
               the API level and by default, the source will be the HEADER.
        :param Sequence['AuthorizerArgs'] authorizers: Authorizers allows you to define Lambda authorizers be applied for authorization when the
               the route is called.
        :param str content_type: The `content-type` to serve the file as.  Only valid when `localPath` points to a file.  If
               `localPath` points to a directory, the content types for all files will be inferred.
        :param Any data: A raw Swagger object to include verbatim in the integration for this path.
        :param pulumi.Input['pulumi_aws.lambda_.Function'] event_handler: A Lambda function which will handle the route for the given path and method.
        :param bool iam_auth_enabled: By default, the route method auth type is set to `NONE`. If true, the auth type will be
               set to `AWS_IAM`.
        :param Union[str, bool] index: By default a `localPath` hosting static content will also serve 'index.html' in response to a request on a directory.
               To disable this pass `false` or supply a new index document name.
        :param str local_path: The local path on disk to create static S3 resources for.  Files will be uploaded into S3
               objects, and directories will be recursively walked into.
        :param 'Method' method: The REST method of the route to match.  Only valid with `eventHandler` or `data` routes.
        :param 'RequestValidator' request_validator: Request Validator specifies the validator to use at the method level. This will override anything
               defined at the API level.
        :param Sequence['RequiredParameterArgs'] required_parameters: Required Parameters to validate. If the request validator is set to ALL or PARAMS_ONLY, api
               gateway will validate these before sending traffic to the event handler.
        :param pulumi.Input['TargetArgs'] target: The target for an integration route (see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html).
        """
        pulumi.set(__self__, "path", path)
        if api_key_required is not None:
            pulumi.set(__self__, "api_key_required", api_key_required)
        if authorizers is not None:
            pulumi.set(__self__, "authorizers", authorizers)
        if content_type is not None:
            pulumi.set(__self__, "content_type", content_type)
        if data is not None:
            pulumi.set(__self__, "data", data)
        if event_handler is not None:
            pulumi.set(__self__, "event_handler", event_handler)
        if iam_auth_enabled is not None:
            pulumi.set(__self__, "iam_auth_enabled", iam_auth_enabled)
        if index is not None:
            pulumi.set(__self__, "index", index)
        if local_path is not None:
            pulumi.set(__self__, "local_path", local_path)
        if method is not None:
            pulumi.set(__self__, "method", method)
        if request_validator is not None:
            pulumi.set(__self__, "request_validator", request_validator)
        if required_parameters is not None:
            pulumi.set(__self__, "required_parameters", required_parameters)
        if target is not None:
            pulumi.set(__self__, "target", target)

    @property
    @pulumi.getter
    def path(self) -> str:
        """
        The path on the API that will serve this route.  If not prefixed with `/`,
        then a `/` will be added automatically to the beginning.
        """
        return pulumi.get(self, "path")

    @path.setter
    def path(self, value: str):
        pulumi.set(self, "path", value)

    @property
    @pulumi.getter(name="apiKeyRequired")
    def api_key_required(self) -> Optional[bool]:
        """
        If true, an API key will be required for this route. The source for the API Key can be set at
        the API level and by default, the source will be the HEADER.
        """
        return pulumi.get(self, "api_key_required")

    @api_key_required.setter
    def api_key_required(self, value: Optional[bool]):
        pulumi.set(self, "api_key_required", value)

    @property
    @pulumi.getter
    def authorizers(self) -> Optional[Sequence['AuthorizerArgs']]:
        """
        Authorizers allows you to define Lambda authorizers be applied for authorization when the
        the route is called.
        """
        return pulumi.get(self, "authorizers")

    @authorizers.setter
    def authorizers(self, value: Optional[Sequence['AuthorizerArgs']]):
        pulumi.set(self, "authorizers", value)

    @property
    @pulumi.getter(name="contentType")
    def content_type(self) -> Optional[str]:
        """
        The `content-type` to serve the file as.  Only valid when `localPath` points to a file.  If
        `localPath` points to a directory, the content types for all files will be inferred.
        """
        return pulumi.get(self, "content_type")

    @content_type.setter
    def content_type(self, value: Optional[str]):
        pulumi.set(self, "content_type", value)

    @property
    @pulumi.getter
    def data(self) -> Optional[Any]:
        """
        A raw Swagger object to include verbatim in the integration for this path.
        """
        return pulumi.get(self, "data")

    @data.setter
    def data(self, value: Optional[Any]):
        pulumi.set(self, "data", value)

    @property
    @pulumi.getter(name="eventHandler")
    def event_handler(self) -> Optional[pulumi.Input['pulumi_aws.lambda_.Function']]:
        """
        A Lambda function which will handle the route for the given path and method.
        """
        return pulumi.get(self, "event_handler")

    @event_handler.setter
    def event_handler(self, value: Optional[pulumi.Input['pulumi_aws.lambda_.Function']]):
        pulumi.set(self, "event_handler", value)

    @property
    @pulumi.getter(name="iamAuthEnabled")
    def iam_auth_enabled(self) -> Optional[bool]:
        """
        By default, the route method auth type is set to `NONE`. If true, the auth type will be
        set to `AWS_IAM`.
        """
        return pulumi.get(self, "iam_auth_enabled")

    @iam_auth_enabled.setter
    def iam_auth_enabled(self, value: Optional[bool]):
        pulumi.set(self, "iam_auth_enabled", value)

    @property
    @pulumi.getter
    def index(self) -> Optional[Union[str, bool]]:
        """
        By default a `localPath` hosting static content will also serve 'index.html' in response to a request on a directory.
        To disable this pass `false` or supply a new index document name.
        """
        return pulumi.get(self, "index")

    @index.setter
    def index(self, value: Optional[Union[str, bool]]):
        pulumi.set(self, "index", value)

    @property
    @pulumi.getter(name="localPath")
    def local_path(self) -> Optional[str]:
        """
        The local path on disk to create static S3 resources for.  Files will be uploaded into S3
        objects, and directories will be recursively walked into.
        """
        return pulumi.get(self, "local_path")

    @local_path.setter
    def local_path(self, value: Optional[str]):
        pulumi.set(self, "local_path", value)

    @property
    @pulumi.getter
    def method(self) -> Optional['Method']:
        """
        The REST method of the route to match.  Only valid with `eventHandler` or `data` routes.
        """
        return pulumi.get(self, "method")

    @method.setter
    def method(self, value: Optional['Method']):
        pulumi.set(self, "method", value)

    @property
    @pulumi.getter(name="requestValidator")
    def request_validator(self) -> Optional['RequestValidator']:
        """
        Request Validator specifies the validator to use at the method level. This will override anything
        defined at the API level.
        """
        return pulumi.get(self, "request_validator")

    @request_validator.setter
    def request_validator(self, value: Optional['RequestValidator']):
        pulumi.set(self, "request_validator", value)

    @property
    @pulumi.getter(name="requiredParameters")
    def required_parameters(self) -> Optional[Sequence['RequiredParameterArgs']]:
        """
        Required Parameters to validate. If the request validator is set to ALL or PARAMS_ONLY, api
        gateway will validate these before sending traffic to the event handler.
        """
        return pulumi.get(self, "required_parameters")

    @required_parameters.setter
    def required_parameters(self, value: Optional[Sequence['RequiredParameterArgs']]):
        pulumi.set(self, "required_parameters", value)

    @property
    @pulumi.getter
    def target(self) -> Optional[pulumi.Input['TargetArgs']]:
        """
        The target for an integration route (see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html).
        """
        return pulumi.get(self, "target")

    @target.setter
    def target(self, value: Optional[pulumi.Input['TargetArgs']]):
        pulumi.set(self, "target", value)


@pulumi.input_type
class SwaggerGatewayResponseArgs:
    def __init__(__self__, *,
                 response_parameters: Optional[pulumi.Input[Mapping[str, pulumi.Input[str]]]] = None,
                 response_templates: Optional[pulumi.Input[Mapping[str, pulumi.Input[str]]]] = None,
                 status_code: Optional[pulumi.Input[float]] = None):
        if response_parameters is not None:
            pulumi.set(__self__, "response_parameters", response_parameters)
        if response_templates is not None:
            pulumi.set(__self__, "response_templates", response_templates)
        if status_code is not None:
            pulumi.set(__self__, "status_code", status_code)

    @property
    @pulumi.getter(name="responseParameters")
    def response_parameters(self) -> Optional[pulumi.Input[Mapping[str, pulumi.Input[str]]]]:
        return pulumi.get(self, "response_parameters")

    @response_parameters.setter
    def response_parameters(self, value: Optional[pulumi.Input[Mapping[str, pulumi.Input[str]]]]):
        pulumi.set(self, "response_parameters", value)

    @property
    @pulumi.getter(name="responseTemplates")
    def response_templates(self) -> Optional[pulumi.Input[Mapping[str, pulumi.Input[str]]]]:
        return pulumi.get(self, "response_templates")

    @response_templates.setter
    def response_templates(self, value: Optional[pulumi.Input[Mapping[str, pulumi.Input[str]]]]):
        pulumi.set(self, "response_templates", value)

    @property
    @pulumi.getter(name="statusCode")
    def status_code(self) -> Optional[pulumi.Input[float]]:
        return pulumi.get(self, "status_code")

    @status_code.setter
    def status_code(self, value: Optional[pulumi.Input[float]]):
        pulumi.set(self, "status_code", value)


@pulumi.input_type
class TargetArgs:
    def __init__(__self__, *,
                 type: pulumi.Input['IntegrationType'],
                 connection_id: Optional[pulumi.Input[str]] = None,
                 connection_type: Optional[pulumi.Input['IntegrationConnectionType']] = None,
                 http_method: Optional[pulumi.Input[str]] = None,
                 passthrough_behaviour: Optional[pulumi.Input['IntegrationPassthroughBehavior']] = None,
                 uri: Optional[pulumi.Input[str]] = None):
        """
        :param pulumi.Input['IntegrationType'] type: Specifies an API method integration type. The valid value is one of the following:
               
               * `aws`: for integrating the API method request with an AWS service action, including the Lambda
               function-invoking action. With the Lambda function-invoking action, this is referred to as
               the Lambda custom integration. With any other AWS service action, this is known as AWS
               integration.
               
               * `aws_proxy`: for integrating the API method request with the Lambda function-invoking action
               with the client request passed through as-is. This integration is also referred to as the
               Lambda proxy integration.
               
               * `http`: for integrating the API method request with an HTTP endpoint, including a private HTTP
               endpoint within a VPC. This integration is also referred to as the HTTP custom integration.
               
               * `http_proxy`: for integrating the API method request with an HTTP endpoint, including a private
               HTTP endpoint within a VPC, with the client request passed through as-is. This is also
               referred to as the HTTP proxy integration.
               
               * `mock`: for integrating the API method request with API Gateway as a "loop-back" endpoint
               without invoking any backend.
        :param pulumi.Input[str] connection_id: The (id) of the VpcLink used for the integration when connectionType=VPC_LINK and undefined,
               otherwise.
        :param pulumi.Input['IntegrationConnectionType'] connection_type: The type of the network connection to the integration endpoint. The valid value is `INTERNET`
               for connections through the public routable internet or `VPC_LINK` for private connections
               between API Gateway and a network load balancer in a VPC. The default value is `INTERNET`.
        :param pulumi.Input[str] http_method: Specifies the integration's HTTP method type.  Currently, the only supported type is 'ANY'.
        :param pulumi.Input['IntegrationPassthroughBehavior'] passthrough_behaviour: Specifies how the method request body of an unmapped content type will be passed through the
               integration request to the back end without transformation.
               
               The valid value is one of the following:
               
               * `WHEN_NO_MATCH`: passes the method request body through the integration request to the back end
               without transformation when the method request content type does not match any content type
               associated with the mapping templates defined in the integration request.
               
               * `WHEN_NO_TEMPLATES`: passes the method request body through the integration request to the back
               end without transformation when no mapping template is defined in the integration request. If
               a template is defined when this option is selected, the method request of an unmapped
               content-type will be rejected with an HTTP 415 Unsupported Media Type response.
               
               * `NEVER`: rejects the method request with an HTTP 415 Unsupported Media Type response when
               either the method request content type does not match any content type associated with the
               mapping templates defined in the integration request or no mapping template is defined in the
               integration request.
               
               Defaults to `WHEN_NO_MATCH` if unspecified.
        :param pulumi.Input[str] uri: Specifies Uniform Resource Identifier (URI) of the integration endpoint.
               
               For HTTP or HTTP_PROXY integrations, the URI must be a fully formed, encoded HTTP(S) URL
               according to the RFC-3986 specification, for either standard integration, where
               connectionType is not VPC_LINK, or private integration, where connectionType is VPC_LINK. For
               a private HTTP integration, the URI is not used for routing.
               
               For AWS or AWS_PROXY integrations, the URI is of the form
               arn:aws:apigateway:{region}:{subdomain.service|service}:path|action/{service_api}. Here,
               {Region} is the API Gateway region (e.g., us-east-1); {service} is the name of the integrated
               AWS service (e.g., s3); and {subdomain} is a designated subdomain supported by certain AWS
               service for fast host-name lookup. action can be used for an AWS service action-based API,
               using an Action={name}&{p1}={v1}&p2={v2}... query string. The ensuing {service_api} refers to
               a supported action {name} plus any required input parameters. Alternatively, path can be used
               for an AWS service path-based API. The ensuing service_api refers to the path to an AWS
               service resource, including the region of the integrated AWS service, if applicable. For
               example, for integration with the S3 API of GetObject, the uri can be either
               arn:aws:apigateway:us-west-2:s3:action/GetObject&Bucket={bucket}&Key={key} or
               arn:aws:apigateway:us-west-2:s3:path/{bucket}/{key}.
        """
        pulumi.set(__self__, "type", type)
        if connection_id is not None:
            pulumi.set(__self__, "connection_id", connection_id)
        if connection_type is not None:
            pulumi.set(__self__, "connection_type", connection_type)
        if http_method is not None:
            pulumi.set(__self__, "http_method", 'ANY')
        if passthrough_behaviour is not None:
            pulumi.set(__self__, "passthrough_behaviour", passthrough_behaviour)
        if uri is not None:
            pulumi.set(__self__, "uri", uri)

    @property
    @pulumi.getter
    def type(self) -> pulumi.Input['IntegrationType']:
        """
        Specifies an API method integration type. The valid value is one of the following:

        * `aws`: for integrating the API method request with an AWS service action, including the Lambda
        function-invoking action. With the Lambda function-invoking action, this is referred to as
        the Lambda custom integration. With any other AWS service action, this is known as AWS
        integration.

        * `aws_proxy`: for integrating the API method request with the Lambda function-invoking action
        with the client request passed through as-is. This integration is also referred to as the
        Lambda proxy integration.

        * `http`: for integrating the API method request with an HTTP endpoint, including a private HTTP
        endpoint within a VPC. This integration is also referred to as the HTTP custom integration.

        * `http_proxy`: for integrating the API method request with an HTTP endpoint, including a private
        HTTP endpoint within a VPC, with the client request passed through as-is. This is also
        referred to as the HTTP proxy integration.

        * `mock`: for integrating the API method request with API Gateway as a "loop-back" endpoint
        without invoking any backend.
        """
        return pulumi.get(self, "type")

    @type.setter
    def type(self, value: pulumi.Input['IntegrationType']):
        pulumi.set(self, "type", value)

    @property
    @pulumi.getter(name="connectionId")
    def connection_id(self) -> Optional[pulumi.Input[str]]:
        """
        The (id) of the VpcLink used for the integration when connectionType=VPC_LINK and undefined,
        otherwise.
        """
        return pulumi.get(self, "connection_id")

    @connection_id.setter
    def connection_id(self, value: Optional[pulumi.Input[str]]):
        pulumi.set(self, "connection_id", value)

    @property
    @pulumi.getter(name="connectionType")
    def connection_type(self) -> Optional[pulumi.Input['IntegrationConnectionType']]:
        """
        The type of the network connection to the integration endpoint. The valid value is `INTERNET`
        for connections through the public routable internet or `VPC_LINK` for private connections
        between API Gateway and a network load balancer in a VPC. The default value is `INTERNET`.
        """
        return pulumi.get(self, "connection_type")

    @connection_type.setter
    def connection_type(self, value: Optional[pulumi.Input['IntegrationConnectionType']]):
        pulumi.set(self, "connection_type", value)

    @property
    @pulumi.getter(name="httpMethod")
    def http_method(self) -> Optional[pulumi.Input[str]]:
        """
        Specifies the integration's HTTP method type.  Currently, the only supported type is 'ANY'.
        """
        return pulumi.get(self, "http_method")

    @http_method.setter
    def http_method(self, value: Optional[pulumi.Input[str]]):
        pulumi.set(self, "http_method", value)

    @property
    @pulumi.getter(name="passthroughBehaviour")
    def passthrough_behaviour(self) -> Optional[pulumi.Input['IntegrationPassthroughBehavior']]:
        """
        Specifies how the method request body of an unmapped content type will be passed through the
        integration request to the back end without transformation.

        The valid value is one of the following:

        * `WHEN_NO_MATCH`: passes the method request body through the integration request to the back end
        without transformation when the method request content type does not match any content type
        associated with the mapping templates defined in the integration request.

        * `WHEN_NO_TEMPLATES`: passes the method request body through the integration request to the back
        end without transformation when no mapping template is defined in the integration request. If
        a template is defined when this option is selected, the method request of an unmapped
        content-type will be rejected with an HTTP 415 Unsupported Media Type response.

        * `NEVER`: rejects the method request with an HTTP 415 Unsupported Media Type response when
        either the method request content type does not match any content type associated with the
        mapping templates defined in the integration request or no mapping template is defined in the
        integration request.

        Defaults to `WHEN_NO_MATCH` if unspecified.
        """
        return pulumi.get(self, "passthrough_behaviour")

    @passthrough_behaviour.setter
    def passthrough_behaviour(self, value: Optional[pulumi.Input['IntegrationPassthroughBehavior']]):
        pulumi.set(self, "passthrough_behaviour", value)

    @property
    @pulumi.getter
    def uri(self) -> Optional[pulumi.Input[str]]:
        """
        Specifies Uniform Resource Identifier (URI) of the integration endpoint.

        For HTTP or HTTP_PROXY integrations, the URI must be a fully formed, encoded HTTP(S) URL
        according to the RFC-3986 specification, for either standard integration, where
        connectionType is not VPC_LINK, or private integration, where connectionType is VPC_LINK. For
        a private HTTP integration, the URI is not used for routing.

        For AWS or AWS_PROXY integrations, the URI is of the form
        arn:aws:apigateway:{region}:{subdomain.service|service}:path|action/{service_api}. Here,
        {Region} is the API Gateway region (e.g., us-east-1); {service} is the name of the integrated
        AWS service (e.g., s3); and {subdomain} is a designated subdomain supported by certain AWS
        service for fast host-name lookup. action can be used for an AWS service action-based API,
        using an Action={name}&{p1}={v1}&p2={v2}... query string. The ensuing {service_api} refers to
        a supported action {name} plus any required input parameters. Alternatively, path can be used
        for an AWS service path-based API. The ensuing service_api refers to the path to an AWS
        service resource, including the region of the integrated AWS service, if applicable. For
        example, for integration with the S3 API of GetObject, the uri can be either
        arn:aws:apigateway:us-west-2:s3:action/GetObject&Bucket={bucket}&Key={key} or
        arn:aws:apigateway:us-west-2:s3:path/{bucket}/{key}.
        """
        return pulumi.get(self, "uri")

    @uri.setter
    def uri(self, value: Optional[pulumi.Input[str]]):
        pulumi.set(self, "uri", value)


