# Custom Lambda Request Authorizer

## Setup

1. `pulumi config set aws:region [YOUR_REGION]` - configure where you want to deploy to
2. `pulumi up` to deploy the stack

## Testing

```bash
$ curl -w '\n' $(pulumi stack output url)
> {"message":"Unauthorized"}
$ curl -w '\n' -H "Authorization: goodToken" $(pulumi stack output url)
> <h1>Hello Pulumi!</h1>
$ curl -w '\n' -H "Authorization: badToken" $(pulumi stack output url)
> {"message": "404 Not found" }
```
