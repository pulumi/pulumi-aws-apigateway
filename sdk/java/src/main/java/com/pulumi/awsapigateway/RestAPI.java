// *** WARNING: this file was generated by pulumi-java-gen. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package com.pulumi.awsapigateway;

import com.pulumi.aws.apigateway.Deployment;
import com.pulumi.aws.apigateway.RestApi;
import com.pulumi.aws.apigateway.RestApiPolicy;
import com.pulumi.aws.apigateway.Stage;
import com.pulumi.awsapigateway.RestAPIArgs;
import com.pulumi.awsapigateway.Utilities;
import com.pulumi.core.Output;
import com.pulumi.core.annotations.Export;
import com.pulumi.core.annotations.ResourceType;
import com.pulumi.core.internal.Codegen;
import java.lang.String;
import java.util.Optional;
import javax.annotation.Nullable;

/**
 * The RestAPI component offers a simple interface for creating a fully functional API Gateway REST API. The
 * REST API can define any number of routes, each of which maps a path and HTTP method to one of (1) an event
 * hander route that invokes a Lambda Function (2) a local path route which uploads local files into an S3 bucket
 * and serves them or (3) an integration target such as an HTTP proxy or service integration.
 * 
 */
@ResourceType(type="aws-apigateway:index:RestAPI")
public class RestAPI extends com.pulumi.resources.ComponentResource {
    /**
     * The underlying RestAPI resource.
     * 
     */
    @Export(name="api", refs={RestApi.class}, tree="[0]")
    private Output<RestApi> api;

    /**
     * @return The underlying RestAPI resource.
     * 
     */
    public Output<RestApi> api() {
        return this.api;
    }
    /**
     * The underlying RestAPIPolicy resource.
     * 
     */
    @Export(name="apiPolicy", refs={RestApiPolicy.class}, tree="[0]")
    private Output</* @Nullable */ RestApiPolicy> apiPolicy;

    /**
     * @return The underlying RestAPIPolicy resource.
     * 
     */
    public Output<Optional<RestApiPolicy>> apiPolicy() {
        return Codegen.optional(this.apiPolicy);
    }
    /**
     * The underlying Deployment resource.
     * 
     */
    @Export(name="deployment", refs={Deployment.class}, tree="[0]")
    private Output<Deployment> deployment;

    /**
     * @return The underlying Deployment resource.
     * 
     */
    public Output<Deployment> deployment() {
        return this.deployment;
    }
    /**
     * The underlying Stage resource.
     * 
     */
    @Export(name="stage", refs={Stage.class}, tree="[0]")
    private Output<Stage> stage;

    /**
     * @return The underlying Stage resource.
     * 
     */
    public Output<Stage> stage() {
        return this.stage;
    }
    /**
     * The URL where the Rest API is exposed.
     * 
     */
    @Export(name="url", refs={String.class}, tree="[0]")
    private Output<String> url;

    /**
     * @return The URL where the Rest API is exposed.
     * 
     */
    public Output<String> url() {
        return this.url;
    }

    /**
     *
     * @param name The _unique_ name of the resulting resource.
     */
    public RestAPI(java.lang.String name) {
        this(name, RestAPIArgs.Empty);
    }
    /**
     *
     * @param name The _unique_ name of the resulting resource.
     * @param args The arguments to use to populate this resource's properties.
     */
    public RestAPI(java.lang.String name, @Nullable RestAPIArgs args) {
        this(name, args, null);
    }
    /**
     *
     * @param name The _unique_ name of the resulting resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param options A bag of options that control this resource's behavior.
     */
    public RestAPI(java.lang.String name, @Nullable RestAPIArgs args, @Nullable com.pulumi.resources.ComponentResourceOptions options) {
        super("aws-apigateway:index:RestAPI", name, makeArgs(args, options), makeResourceOptions(options, Codegen.empty()), true);
    }

    private static RestAPIArgs makeArgs(@Nullable RestAPIArgs args, @Nullable com.pulumi.resources.ComponentResourceOptions options) {
        if (options != null && options.getUrn().isPresent()) {
            return null;
        }
        return args == null ? RestAPIArgs.Empty : args;
    }

    private static com.pulumi.resources.ComponentResourceOptions makeResourceOptions(@Nullable com.pulumi.resources.ComponentResourceOptions options, @Nullable Output<java.lang.String> id) {
        var defaultOptions = com.pulumi.resources.ComponentResourceOptions.builder()
            .version(Utilities.getVersion())
            .build();
        return com.pulumi.resources.ComponentResourceOptions.merge(defaultOptions, options, id);
    }

}
