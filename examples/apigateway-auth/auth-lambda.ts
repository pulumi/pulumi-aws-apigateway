import * as awslambda from "aws-lambda";

type AuthorizerLambda = (event: awslambda.APIGatewayAuthorizerEvent) => Promise<awslambda.APIGatewayAuthorizerResult>

export function authorizerLambda(): AuthorizerLambda {
    return async (event: awslambda.APIGatewayAuthorizerEvent) => {
        try {
            return await authenticate(event);
        }
        catch (err) {
            console.log(err);
            // Tells API Gateway to return a 401 Unauthorized response
            throw new Error("Unauthorized");
        }
    }
}

// Extract and return the Bearer Token from the Lambda event parameters
function getToken(event: awslambda.APIGatewayAuthorizerEvent): string | undefined {
    if (!event.type || event.type !== "TOKEN") {
        throw new Error('Expected "event.type" parameter to have value "TOKEN"');
    }

    const tokenString = event.authorizationToken;
    if (!tokenString) {
        return undefined;
    }

    const match = tokenString.match(/^Bearer (.*)$/);
    if (!match) {
        // Invalid Authorization token - does not match "Bearer .*"
        return undefined;
    }
    return match[1];
}

// Check the Token is valid
async function authenticate(event: awslambda.APIGatewayAuthorizerEvent): Promise<awslambda.APIGatewayAuthorizerResult> {
    console.log(event);
    const token = getToken(event);

    // Dummy check for token, in a real-world scenario, you would verify the token 
    const effect = token ? "Allow" : "Deny";

    const methodArn = getMethodArn(event);
    console.log(`Method ARN: ${methodArn}`);
    return {
        principalId: "me",
        policyDocument: {
            Version: "2012-10-17",
            Statement: [{
                Action: "execute-api:Invoke",
                Effect: effect,
                Resource: methodArn,
            }],
        },
    };
}

function getMethodArn(event: awslambda.APIGatewayAuthorizerEvent): string {
    if (!event.methodArn) {
        throw new Error('Expected "event.methodArn" parameter to be set');
    }

    const arnPartials = event.methodArn.split("/");
    return arnPartials.slice(0, 2).join("/") + "/*";
}
