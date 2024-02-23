// *** WARNING: this file was generated by Pulumi SDK Generator. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Threading.Tasks;
using Pulumi.Serialization;

namespace Pulumi.AwsApiGateway
{
    /// <summary>
    /// The RestAPI component offers a simple interface for creating a fully functional API Gateway REST API. The
    /// REST API can define any number of routes, each of which maps a path and HTTP method to one of (1) an event
    /// hander route that invokes a Lambda Function (2) a local path route which uploads local files into an S3 bucket
    /// and serves them or (3) an integration target such as an HTTP proxy or service integration.
    /// </summary>
    [AwsApiGatewayResourceType("aws-apigateway:index:RestAPI")]
    public partial class RestAPI : global::Pulumi.ComponentResource
    {
        /// <summary>
        /// The underlying RestAPI resource.
        /// </summary>
        [Output("api")]
        public Output<Pulumi.Aws.ApiGateway.RestApi> Api { get; private set; } = null!;

        /// <summary>
        /// The underlying RestAPIPolicy resource.
        /// </summary>
        [Output("apiPolicy")]
        public Output<Pulumi.Aws.ApiGateway.RestApiPolicy?> ApiPolicy { get; private set; } = null!;

        /// <summary>
        /// The underlying Deployment resource.
        /// </summary>
        [Output("deployment")]
        public Output<Pulumi.Aws.ApiGateway.Deployment> Deployment { get; private set; } = null!;

        /// <summary>
        /// The underlying Stage resource.
        /// </summary>
        [Output("stage")]
        public Output<Pulumi.Aws.ApiGateway.Stage> Stage { get; private set; } = null!;

        /// <summary>
        /// The URL where the Rest API is exposed.
        /// </summary>
        [Output("url")]
        public Output<string> Url { get; private set; } = null!;


        /// <summary>
        /// Create a RestAPI resource with the given unique name, arguments, and options.
        /// </summary>
        ///
        /// <param name="name">The unique name of the resource</param>
        /// <param name="args">The arguments used to populate this resource's properties</param>
        /// <param name="options">A bag of options that control this resource's behavior</param>
        public RestAPI(string name, RestAPIArgs? args = null, ComponentResourceOptions? options = null)
            : base("aws-apigateway:index:RestAPI", name, args ?? new RestAPIArgs(), MakeResourceOptions(options, ""), remote: true)
        {
        }

        private static ComponentResourceOptions MakeResourceOptions(ComponentResourceOptions? options, Input<string>? id)
        {
            var defaultOptions = new ComponentResourceOptions
            {
                Version = Utilities.Version,
            };
            var merged = ComponentResourceOptions.Merge(defaultOptions, options);
            // Override the ID if one was specified for consistency with other language SDKs.
            merged.Id = id ?? merged.Id;
            return merged;
        }
    }

    public sealed class RestAPIArgs : global::Pulumi.ResourceArgs
    {
        /// <summary>
        /// The source for the apikey. This can either be a HEADER or AUTHORIZER. If `apiKeyRequired` is
        /// set to true on a route, and this is not defined the value will default to HEADER.
        /// </summary>
        [Input("apiKeySource")]
        public Pulumi.AwsApiGateway.APIKeySource? ApiKeySource { get; set; }

        [Input("binaryMediaTypes")]
        private List<Input<string>>? _binaryMediaTypes;

        /// <summary>
        /// List of binary media types supported by the REST API. By default, the REST API supports only UTF-8-encoded text payloads. 
        /// If importing an OpenAPI specification via the body argument, this corresponds to the x-amazon-apigateway-binary-media-types extension. 
        /// If the argument value is provided and is different than the OpenAPI value, the argument value will override the OpenAPI value.
        /// </summary>
        public List<Input<string>> BinaryMediaTypes
        {
            get => _binaryMediaTypes ?? (_binaryMediaTypes = new List<Input<string>>());
            set => _binaryMediaTypes = value;
        }

        /// <summary>
        /// Whether clients can invoke your API by using the default execute-api endpoint. By default, clients can invoke
        /// your API with the default https://{api_id}.execute-api.{region}.amazonaws.com endpoint. To require that
        /// clients use a custom domain name to invoke your API, disable the default endpoint. Defaults to false.
        /// </summary>
        [Input("disableExecuteApiEndpoint")]
        public Input<bool>? DisableExecuteApiEndpoint { get; set; }

        [Input("gatewayResponses")]
        private Dictionary<string, Input<Inputs.SwaggerGatewayResponseArgs>>? _gatewayResponses;

        /// <summary>
        /// Define custom gateway responses for the API. This can be used to properly enable
        /// CORS for Lambda Authorizers.
        /// </summary>
        public Dictionary<string, Input<Inputs.SwaggerGatewayResponseArgs>> GatewayResponses
        {
            get => _gatewayResponses ?? (_gatewayResponses = new Dictionary<string, Input<Inputs.SwaggerGatewayResponseArgs>>());
            set => _gatewayResponses = value;
        }

        /// <summary>
        /// Request Validator specifies the validator to use at the API level. Note method level validators
        /// override this.
        /// </summary>
        [Input("requestValidator")]
        public Pulumi.AwsApiGateway.RequestValidator? RequestValidator { get; set; }

        [Input("routes")]
        private List<Inputs.RouteArgs>? _routes;

        /// <summary>
        /// Routes to use to initialize the APIGateway.  These will be used to create the Swagger
        /// specification for the API.
        /// 
        /// Either `swaggerString` or `routes` must be specified.
        /// </summary>
        public List<Inputs.RouteArgs> Routes
        {
            get => _routes ?? (_routes = new List<Inputs.RouteArgs>());
            set => _routes = value;
        }

        /// <summary>
        /// The stage name for your API. This will get added as a base path to your API url.
        /// </summary>
        [Input("stageName")]
        public Input<string>? StageName { get; set; }

        /// <summary>
        /// Bucket to use for placing resources for static resources.  If not provided a default one will
        /// be created on your behalf if any `StaticRoute`s are provided.
        /// </summary>
        [Input("staticRoutesBucket")]
        public Input<Pulumi.Aws.S3.Bucket>? StaticRoutesBucket { get; set; }

        /// <summary>
        /// A Swagger specification already in string form to use to initialize the APIGateway.  Note
        /// that you must manually provide permission for any route targets to be invoked by API Gateway
        /// when using `swaggerString`.
        /// 
        /// Either `swaggerString` or `routes` must be specified.
        /// </summary>
        [Input("swaggerString")]
        public Input<string>? SwaggerString { get; set; }

        public RestAPIArgs()
        {
        }
        public static new RestAPIArgs Empty => new RestAPIArgs();
    }
}
