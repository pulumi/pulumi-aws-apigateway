import * as assert from "assert";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import { RestAPI } from "../restAPI";

type RestApiBodies = Record<string, pulumi.Input<string> | undefined>;

function resolveOutput<T>(value: pulumi.Input<T>): Promise<T> {
  return new Promise((resolve) => {
    pulumi.output(value).apply((resolved) => {
      resolve(resolved as T);
      return resolved;
    });
  });
}

async function main() {
  const restApiBodies: RestApiBodies = {};

  await pulumi.runtime.setMocks({
    call: ({ token }) => {
      switch (token) {
      case "aws:index/getPartition:getPartition":
        return {
          dnsSuffix: "amazonaws.com.cn",
          id: "aws-cn",
          partition: "aws-cn",
          reverseDnsPrefix: "cn.com.amazonaws",
        };
      case "aws:index/getRegion:getRegion":
        return { name: "cn-northwest-1" };
      default:
        return {};
      }
    },
    newResource: ({ type, name, inputs }) => {
      if (type === "aws:apigateway/restApi:RestApi") {
        restApiBodies[name] = inputs.body;
      }

      return {
        id: `${name}-id`,
        state: inputs,
      };
    },
  });

  const lambda = new aws.lambda.Function("lambda-route-fn", {
    code: new pulumi.asset.AssetArchive({
      "index.js": new pulumi.asset.StringAsset("exports.handler = async () => ({ statusCode: 200, body: 'ok' });"),
    }),
    handler: "index.handler",
    role: "arn:aws-cn:iam::123456789012:role/example",
    runtime: "nodejs22.x",
  });

  new RestAPI("lambda-api", <any>{
    routes: [<any>{
      eventHandler: lambda,
      method: "GET",
      path: "/",
    }],
  });

  const staticDir = fs.mkdtempSync(path.join(os.tmpdir(), "apigw-static-"));
  fs.writeFileSync(path.join(staticDir, "index.html"), "hello");

  new RestAPI("static-api", <any>{
    routes: [<any>{
      localPath: staticDir,
      path: "/assets",
    }],
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  const lambdaBody = await resolveOutput(restApiBodies["lambda-api"]);
  const staticBody = await resolveOutput(restApiBodies["static-api"]);

  assert.ok(lambdaBody);
  assert.ok(staticBody);

  assert.match(
    lambdaBody as string,
    /arn:aws-cn:apigateway:cn-northwest-1:lambda:path\/2015-03-31\/functions\//,
  );
  assert.match(
    staticBody as string,
    /arn:aws-cn:apigateway:cn-northwest-1:s3:path\//,
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
