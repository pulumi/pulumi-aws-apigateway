// *** WARNING: this file was generated by pulumi-java-gen. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package com.pulumi.awsapigateway.inputs;

import com.pulumi.awsapigateway.enums.IntegrationConnectionType;
import com.pulumi.awsapigateway.enums.IntegrationPassthroughBehavior;
import com.pulumi.awsapigateway.enums.IntegrationType;
import com.pulumi.core.Output;
import com.pulumi.core.annotations.Import;
import com.pulumi.core.internal.Codegen;
import java.lang.String;
import java.util.Objects;
import java.util.Optional;
import javax.annotation.Nullable;


public final class TargetArgs extends com.pulumi.resources.ResourceArgs {

    public static final TargetArgs Empty = new TargetArgs();

    /**
     * The (id) of the VpcLink used for the integration when connectionType=VPC_LINK and undefined,
     * otherwise.
     * 
     */
    @Import(name="connectionId")
    private @Nullable Output<String> connectionId;

    /**
     * @return The (id) of the VpcLink used for the integration when connectionType=VPC_LINK and undefined,
     * otherwise.
     * 
     */
    public Optional<Output<String>> connectionId() {
        return Optional.ofNullable(this.connectionId);
    }

    /**
     * The type of the network connection to the integration endpoint. The valid value is `INTERNET`
     * for connections through the public routable internet or `VPC_LINK` for private connections
     * between API Gateway and a network load balancer in a VPC. The default value is `INTERNET`.
     * 
     */
    @Import(name="connectionType")
    private @Nullable Output<IntegrationConnectionType> connectionType;

    /**
     * @return The type of the network connection to the integration endpoint. The valid value is `INTERNET`
     * for connections through the public routable internet or `VPC_LINK` for private connections
     * between API Gateway and a network load balancer in a VPC. The default value is `INTERNET`.
     * 
     */
    public Optional<Output<IntegrationConnectionType>> connectionType() {
        return Optional.ofNullable(this.connectionType);
    }

    /**
     * Specifies the integration&#39;s HTTP method type.  Currently, the only supported type is &#39;ANY&#39;.
     * 
     */
    @Import(name="httpMethod")
    private @Nullable Output<String> httpMethod;

    /**
     * @return Specifies the integration&#39;s HTTP method type.  Currently, the only supported type is &#39;ANY&#39;.
     * 
     */
    public Optional<Output<String>> httpMethod() {
        return Optional.ofNullable(this.httpMethod);
    }

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
     * 
     */
    @Import(name="passthroughBehaviour")
    private @Nullable Output<IntegrationPassthroughBehavior> passthroughBehaviour;

    /**
     * @return Specifies how the method request body of an unmapped content type will be passed through the
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
     * 
     */
    public Optional<Output<IntegrationPassthroughBehavior>> passthroughBehaviour() {
        return Optional.ofNullable(this.passthroughBehaviour);
    }

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
     * * `mock`: for integrating the API method request with API Gateway as a &#34;loop-back&#34; endpoint
     * without invoking any backend.
     * 
     */
    @Import(name="type", required=true)
    private Output<IntegrationType> type;

    /**
     * @return Specifies an API method integration type. The valid value is one of the following:
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
     * * `mock`: for integrating the API method request with API Gateway as a &#34;loop-back&#34; endpoint
     * without invoking any backend.
     * 
     */
    public Output<IntegrationType> type() {
        return this.type;
    }

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
     * using an Action={name}&amp;{p1}={v1}&amp;p2={v2}... query string. The ensuing {service_api} refers to
     * a supported action {name} plus any required input parameters. Alternatively, path can be used
     * for an AWS service path-based API. The ensuing service_api refers to the path to an AWS
     * service resource, including the region of the integrated AWS service, if applicable. For
     * example, for integration with the S3 API of GetObject, the uri can be either
     * arn:aws:apigateway:us-west-2:s3:action/GetObject&amp;Bucket={bucket}&amp;Key={key} or
     * arn:aws:apigateway:us-west-2:s3:path/{bucket}/{key}.
     * 
     */
    @Import(name="uri")
    private @Nullable Output<String> uri;

    /**
     * @return Specifies Uniform Resource Identifier (URI) of the integration endpoint.
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
     * using an Action={name}&amp;{p1}={v1}&amp;p2={v2}... query string. The ensuing {service_api} refers to
     * a supported action {name} plus any required input parameters. Alternatively, path can be used
     * for an AWS service path-based API. The ensuing service_api refers to the path to an AWS
     * service resource, including the region of the integrated AWS service, if applicable. For
     * example, for integration with the S3 API of GetObject, the uri can be either
     * arn:aws:apigateway:us-west-2:s3:action/GetObject&amp;Bucket={bucket}&amp;Key={key} or
     * arn:aws:apigateway:us-west-2:s3:path/{bucket}/{key}.
     * 
     */
    public Optional<Output<String>> uri() {
        return Optional.ofNullable(this.uri);
    }

    private TargetArgs() {}

    private TargetArgs(TargetArgs $) {
        this.connectionId = $.connectionId;
        this.connectionType = $.connectionType;
        this.httpMethod = $.httpMethod;
        this.passthroughBehaviour = $.passthroughBehaviour;
        this.type = $.type;
        this.uri = $.uri;
    }

    public static Builder builder() {
        return new Builder();
    }
    public static Builder builder(TargetArgs defaults) {
        return new Builder(defaults);
    }

    public static final class Builder {
        private TargetArgs $;

        public Builder() {
            $ = new TargetArgs();
        }

        public Builder(TargetArgs defaults) {
            $ = new TargetArgs(Objects.requireNonNull(defaults));
        }

        /**
         * @param connectionId The (id) of the VpcLink used for the integration when connectionType=VPC_LINK and undefined,
         * otherwise.
         * 
         * @return builder
         * 
         */
        public Builder connectionId(@Nullable Output<String> connectionId) {
            $.connectionId = connectionId;
            return this;
        }

        /**
         * @param connectionId The (id) of the VpcLink used for the integration when connectionType=VPC_LINK and undefined,
         * otherwise.
         * 
         * @return builder
         * 
         */
        public Builder connectionId(String connectionId) {
            return connectionId(Output.of(connectionId));
        }

        /**
         * @param connectionType The type of the network connection to the integration endpoint. The valid value is `INTERNET`
         * for connections through the public routable internet or `VPC_LINK` for private connections
         * between API Gateway and a network load balancer in a VPC. The default value is `INTERNET`.
         * 
         * @return builder
         * 
         */
        public Builder connectionType(@Nullable Output<IntegrationConnectionType> connectionType) {
            $.connectionType = connectionType;
            return this;
        }

        /**
         * @param connectionType The type of the network connection to the integration endpoint. The valid value is `INTERNET`
         * for connections through the public routable internet or `VPC_LINK` for private connections
         * between API Gateway and a network load balancer in a VPC. The default value is `INTERNET`.
         * 
         * @return builder
         * 
         */
        public Builder connectionType(IntegrationConnectionType connectionType) {
            return connectionType(Output.of(connectionType));
        }

        /**
         * @param httpMethod Specifies the integration&#39;s HTTP method type.  Currently, the only supported type is &#39;ANY&#39;.
         * 
         * @return builder
         * 
         */
        public Builder httpMethod(@Nullable Output<String> httpMethod) {
            $.httpMethod = httpMethod;
            return this;
        }

        /**
         * @param httpMethod Specifies the integration&#39;s HTTP method type.  Currently, the only supported type is &#39;ANY&#39;.
         * 
         * @return builder
         * 
         */
        public Builder httpMethod(String httpMethod) {
            return httpMethod(Output.of(httpMethod));
        }

        /**
         * @param passthroughBehaviour Specifies how the method request body of an unmapped content type will be passed through the
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
         * 
         * @return builder
         * 
         */
        public Builder passthroughBehaviour(@Nullable Output<IntegrationPassthroughBehavior> passthroughBehaviour) {
            $.passthroughBehaviour = passthroughBehaviour;
            return this;
        }

        /**
         * @param passthroughBehaviour Specifies how the method request body of an unmapped content type will be passed through the
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
         * 
         * @return builder
         * 
         */
        public Builder passthroughBehaviour(IntegrationPassthroughBehavior passthroughBehaviour) {
            return passthroughBehaviour(Output.of(passthroughBehaviour));
        }

        /**
         * @param type Specifies an API method integration type. The valid value is one of the following:
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
         * * `mock`: for integrating the API method request with API Gateway as a &#34;loop-back&#34; endpoint
         * without invoking any backend.
         * 
         * @return builder
         * 
         */
        public Builder type(Output<IntegrationType> type) {
            $.type = type;
            return this;
        }

        /**
         * @param type Specifies an API method integration type. The valid value is one of the following:
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
         * * `mock`: for integrating the API method request with API Gateway as a &#34;loop-back&#34; endpoint
         * without invoking any backend.
         * 
         * @return builder
         * 
         */
        public Builder type(IntegrationType type) {
            return type(Output.of(type));
        }

        /**
         * @param uri Specifies Uniform Resource Identifier (URI) of the integration endpoint.
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
         * using an Action={name}&amp;{p1}={v1}&amp;p2={v2}... query string. The ensuing {service_api} refers to
         * a supported action {name} plus any required input parameters. Alternatively, path can be used
         * for an AWS service path-based API. The ensuing service_api refers to the path to an AWS
         * service resource, including the region of the integrated AWS service, if applicable. For
         * example, for integration with the S3 API of GetObject, the uri can be either
         * arn:aws:apigateway:us-west-2:s3:action/GetObject&amp;Bucket={bucket}&amp;Key={key} or
         * arn:aws:apigateway:us-west-2:s3:path/{bucket}/{key}.
         * 
         * @return builder
         * 
         */
        public Builder uri(@Nullable Output<String> uri) {
            $.uri = uri;
            return this;
        }

        /**
         * @param uri Specifies Uniform Resource Identifier (URI) of the integration endpoint.
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
         * using an Action={name}&amp;{p1}={v1}&amp;p2={v2}... query string. The ensuing {service_api} refers to
         * a supported action {name} plus any required input parameters. Alternatively, path can be used
         * for an AWS service path-based API. The ensuing service_api refers to the path to an AWS
         * service resource, including the region of the integrated AWS service, if applicable. For
         * example, for integration with the S3 API of GetObject, the uri can be either
         * arn:aws:apigateway:us-west-2:s3:action/GetObject&amp;Bucket={bucket}&amp;Key={key} or
         * arn:aws:apigateway:us-west-2:s3:path/{bucket}/{key}.
         * 
         * @return builder
         * 
         */
        public Builder uri(String uri) {
            return uri(Output.of(uri));
        }

        public TargetArgs build() {
            $.httpMethod = Codegen.stringProp("httpMethod").output().arg($.httpMethod).getNullable();
            $.type = Objects.requireNonNull($.type, "expected parameter 'type' to be non-null");
            return $;
        }
    }

}
