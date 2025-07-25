// *** WARNING: this file was generated by pulumi-java-gen. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package com.pulumi.awsapigateway.inputs;

import com.pulumi.aws.lambda.Function;
import com.pulumi.awsapigateway.enums.Method;
import com.pulumi.awsapigateway.enums.RequestValidator;
import com.pulumi.awsapigateway.inputs.AuthorizerArgs;
import com.pulumi.awsapigateway.inputs.RequiredParameterArgs;
import com.pulumi.awsapigateway.inputs.TargetArgs;
import com.pulumi.core.Either;
import com.pulumi.core.Output;
import com.pulumi.core.annotations.Import;
import com.pulumi.exceptions.MissingRequiredPropertyException;
import java.lang.Boolean;
import java.lang.Object;
import java.lang.String;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.annotation.Nullable;


/**
 * A route that that APIGateway should accept and forward to some type of destination. All routes
 * have an incoming path that they match against.  However, destinations are determined by the kind
 * of the route.
 * 
 */
public final class RouteArgs extends com.pulumi.resources.ResourceArgs {

    public static final RouteArgs Empty = new RouteArgs();

    /**
     * If true, an API key will be required for this route. The source for the API Key can be set at
     * the API level and by default, the source will be the HEADER.
     * 
     */
    @Import(name="apiKeyRequired")
    private @Nullable Boolean apiKeyRequired;

    /**
     * @return If true, an API key will be required for this route. The source for the API Key can be set at
     * the API level and by default, the source will be the HEADER.
     * 
     */
    public Optional<Boolean> apiKeyRequired() {
        return Optional.ofNullable(this.apiKeyRequired);
    }

    /**
     * Authorizers allows you to define Lambda authorizers be applied for authorization when the
     * the route is called.
     * 
     */
    @Import(name="authorizers")
    private @Nullable List<AuthorizerArgs> authorizers;

    /**
     * @return Authorizers allows you to define Lambda authorizers be applied for authorization when the
     * the route is called.
     * 
     */
    public Optional<List<AuthorizerArgs>> authorizers() {
        return Optional.ofNullable(this.authorizers);
    }

    /**
     * The `content-type` to serve the file as.  Only valid when `localPath` points to a file.  If
     * `localPath` points to a directory, the content types for all files will be inferred.
     * 
     */
    @Import(name="contentType")
    private @Nullable String contentType;

    /**
     * @return The `content-type` to serve the file as.  Only valid when `localPath` points to a file.  If
     * `localPath` points to a directory, the content types for all files will be inferred.
     * 
     */
    public Optional<String> contentType() {
        return Optional.ofNullable(this.contentType);
    }

    /**
     * A raw Swagger object to include verbatim in the integration for this path.
     * 
     */
    @Import(name="data")
    private @Nullable Object data;

    /**
     * @return A raw Swagger object to include verbatim in the integration for this path.
     * 
     */
    public Optional<Object> data() {
        return Optional.ofNullable(this.data);
    }

    /**
     * A Lambda function which will handle the route for the given path and method.
     * 
     */
    @Import(name="eventHandler")
    private @Nullable Output<Function> eventHandler;

    /**
     * @return A Lambda function which will handle the route for the given path and method.
     * 
     */
    public Optional<Output<Function>> eventHandler() {
        return Optional.ofNullable(this.eventHandler);
    }

    /**
     * By default, the route method auth type is set to `NONE`. If true, the auth type will be
     * set to `AWS_IAM`.
     * 
     */
    @Import(name="iamAuthEnabled")
    private @Nullable Boolean iamAuthEnabled;

    /**
     * @return By default, the route method auth type is set to `NONE`. If true, the auth type will be
     * set to `AWS_IAM`.
     * 
     */
    public Optional<Boolean> iamAuthEnabled() {
        return Optional.ofNullable(this.iamAuthEnabled);
    }

    /**
     * By default a `localPath` hosting static content will also serve &#39;index.html&#39; in response to a request on a directory.
     * To disable this pass `false` or supply a new index document name.
     * 
     */
    @Import(name="index")
    private @Nullable Either<String,Boolean> index;

    /**
     * @return By default a `localPath` hosting static content will also serve &#39;index.html&#39; in response to a request on a directory.
     * To disable this pass `false` or supply a new index document name.
     * 
     */
    public Optional<Either<String,Boolean>> index() {
        return Optional.ofNullable(this.index);
    }

    /**
     * The local path on disk to create static S3 resources for.  Files will be uploaded into S3
     * objects, and directories will be recursively walked into.
     * 
     */
    @Import(name="localPath")
    private @Nullable String localPath;

    /**
     * @return The local path on disk to create static S3 resources for.  Files will be uploaded into S3
     * objects, and directories will be recursively walked into.
     * 
     */
    public Optional<String> localPath() {
        return Optional.ofNullable(this.localPath);
    }

    /**
     * The REST method of the route to match.  Only valid with `eventHandler` or `data` routes.
     * 
     */
    @Import(name="method")
    private @Nullable Method method;

    /**
     * @return The REST method of the route to match.  Only valid with `eventHandler` or `data` routes.
     * 
     */
    public Optional<Method> method() {
        return Optional.ofNullable(this.method);
    }

    /**
     * The path on the API that will serve this route.  If not prefixed with `/`,
     * then a `/` will be added automatically to the beginning.
     * 
     */
    @Import(name="path", required=true)
    private String path;

    /**
     * @return The path on the API that will serve this route.  If not prefixed with `/`,
     * then a `/` will be added automatically to the beginning.
     * 
     */
    public String path() {
        return this.path;
    }

    /**
     * Request Validator specifies the validator to use at the method level. This will override anything
     * defined at the API level.
     * 
     */
    @Import(name="requestValidator")
    private @Nullable RequestValidator requestValidator;

    /**
     * @return Request Validator specifies the validator to use at the method level. This will override anything
     * defined at the API level.
     * 
     */
    public Optional<RequestValidator> requestValidator() {
        return Optional.ofNullable(this.requestValidator);
    }

    /**
     * Required Parameters to validate. If the request validator is set to ALL or PARAMS_ONLY, api
     * gateway will validate these before sending traffic to the event handler.
     * 
     */
    @Import(name="requiredParameters")
    private @Nullable List<RequiredParameterArgs> requiredParameters;

    /**
     * @return Required Parameters to validate. If the request validator is set to ALL or PARAMS_ONLY, api
     * gateway will validate these before sending traffic to the event handler.
     * 
     */
    public Optional<List<RequiredParameterArgs>> requiredParameters() {
        return Optional.ofNullable(this.requiredParameters);
    }

    /**
     * The target for an integration route (see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html).
     * 
     */
    @Import(name="target")
    private @Nullable Output<TargetArgs> target;

    /**
     * @return The target for an integration route (see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html).
     * 
     */
    public Optional<Output<TargetArgs>> target() {
        return Optional.ofNullable(this.target);
    }

    private RouteArgs() {}

    private RouteArgs(RouteArgs $) {
        this.apiKeyRequired = $.apiKeyRequired;
        this.authorizers = $.authorizers;
        this.contentType = $.contentType;
        this.data = $.data;
        this.eventHandler = $.eventHandler;
        this.iamAuthEnabled = $.iamAuthEnabled;
        this.index = $.index;
        this.localPath = $.localPath;
        this.method = $.method;
        this.path = $.path;
        this.requestValidator = $.requestValidator;
        this.requiredParameters = $.requiredParameters;
        this.target = $.target;
    }

    public static Builder builder() {
        return new Builder();
    }
    public static Builder builder(RouteArgs defaults) {
        return new Builder(defaults);
    }

    public static final class Builder {
        private RouteArgs $;

        public Builder() {
            $ = new RouteArgs();
        }

        public Builder(RouteArgs defaults) {
            $ = new RouteArgs(Objects.requireNonNull(defaults));
        }

        /**
         * @param apiKeyRequired If true, an API key will be required for this route. The source for the API Key can be set at
         * the API level and by default, the source will be the HEADER.
         * 
         * @return builder
         * 
         */
        public Builder apiKeyRequired(@Nullable Boolean apiKeyRequired) {
            $.apiKeyRequired = apiKeyRequired;
            return this;
        }

        /**
         * @param authorizers Authorizers allows you to define Lambda authorizers be applied for authorization when the
         * the route is called.
         * 
         * @return builder
         * 
         */
        public Builder authorizers(@Nullable List<AuthorizerArgs> authorizers) {
            $.authorizers = authorizers;
            return this;
        }

        /**
         * @param authorizers Authorizers allows you to define Lambda authorizers be applied for authorization when the
         * the route is called.
         * 
         * @return builder
         * 
         */
        public Builder authorizers(AuthorizerArgs... authorizers) {
            return authorizers(List.of(authorizers));
        }

        /**
         * @param contentType The `content-type` to serve the file as.  Only valid when `localPath` points to a file.  If
         * `localPath` points to a directory, the content types for all files will be inferred.
         * 
         * @return builder
         * 
         */
        public Builder contentType(@Nullable String contentType) {
            $.contentType = contentType;
            return this;
        }

        /**
         * @param data A raw Swagger object to include verbatim in the integration for this path.
         * 
         * @return builder
         * 
         */
        public Builder data(@Nullable Object data) {
            $.data = data;
            return this;
        }

        /**
         * @param eventHandler A Lambda function which will handle the route for the given path and method.
         * 
         * @return builder
         * 
         */
        public Builder eventHandler(@Nullable Output<Function> eventHandler) {
            $.eventHandler = eventHandler;
            return this;
        }

        /**
         * @param eventHandler A Lambda function which will handle the route for the given path and method.
         * 
         * @return builder
         * 
         */
        public Builder eventHandler(Function eventHandler) {
            return eventHandler(Output.of(eventHandler));
        }

        /**
         * @param iamAuthEnabled By default, the route method auth type is set to `NONE`. If true, the auth type will be
         * set to `AWS_IAM`.
         * 
         * @return builder
         * 
         */
        public Builder iamAuthEnabled(@Nullable Boolean iamAuthEnabled) {
            $.iamAuthEnabled = iamAuthEnabled;
            return this;
        }

        /**
         * @param index By default a `localPath` hosting static content will also serve &#39;index.html&#39; in response to a request on a directory.
         * To disable this pass `false` or supply a new index document name.
         * 
         * @return builder
         * 
         */
        public Builder index(@Nullable Either<String,Boolean> index) {
            $.index = index;
            return this;
        }

        /**
         * @param index By default a `localPath` hosting static content will also serve &#39;index.html&#39; in response to a request on a directory.
         * To disable this pass `false` or supply a new index document name.
         * 
         * @return builder
         * 
         */
        public Builder index(String index) {
            return index(Either.ofLeft(index));
        }

        /**
         * @param index By default a `localPath` hosting static content will also serve &#39;index.html&#39; in response to a request on a directory.
         * To disable this pass `false` or supply a new index document name.
         * 
         * @return builder
         * 
         */
        public Builder index(Boolean index) {
            return index(Either.ofRight(index));
        }

        /**
         * @param localPath The local path on disk to create static S3 resources for.  Files will be uploaded into S3
         * objects, and directories will be recursively walked into.
         * 
         * @return builder
         * 
         */
        public Builder localPath(@Nullable String localPath) {
            $.localPath = localPath;
            return this;
        }

        /**
         * @param method The REST method of the route to match.  Only valid with `eventHandler` or `data` routes.
         * 
         * @return builder
         * 
         */
        public Builder method(@Nullable Method method) {
            $.method = method;
            return this;
        }

        /**
         * @param path The path on the API that will serve this route.  If not prefixed with `/`,
         * then a `/` will be added automatically to the beginning.
         * 
         * @return builder
         * 
         */
        public Builder path(String path) {
            $.path = path;
            return this;
        }

        /**
         * @param requestValidator Request Validator specifies the validator to use at the method level. This will override anything
         * defined at the API level.
         * 
         * @return builder
         * 
         */
        public Builder requestValidator(@Nullable RequestValidator requestValidator) {
            $.requestValidator = requestValidator;
            return this;
        }

        /**
         * @param requiredParameters Required Parameters to validate. If the request validator is set to ALL or PARAMS_ONLY, api
         * gateway will validate these before sending traffic to the event handler.
         * 
         * @return builder
         * 
         */
        public Builder requiredParameters(@Nullable List<RequiredParameterArgs> requiredParameters) {
            $.requiredParameters = requiredParameters;
            return this;
        }

        /**
         * @param requiredParameters Required Parameters to validate. If the request validator is set to ALL or PARAMS_ONLY, api
         * gateway will validate these before sending traffic to the event handler.
         * 
         * @return builder
         * 
         */
        public Builder requiredParameters(RequiredParameterArgs... requiredParameters) {
            return requiredParameters(List.of(requiredParameters));
        }

        /**
         * @param target The target for an integration route (see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html).
         * 
         * @return builder
         * 
         */
        public Builder target(@Nullable Output<TargetArgs> target) {
            $.target = target;
            return this;
        }

        /**
         * @param target The target for an integration route (see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html).
         * 
         * @return builder
         * 
         */
        public Builder target(TargetArgs target) {
            return target(Output.of(target));
        }

        public RouteArgs build() {
            if ($.path == null) {
                throw new MissingRequiredPropertyException("RouteArgs", "path");
            }
            return $;
        }
    }

}
