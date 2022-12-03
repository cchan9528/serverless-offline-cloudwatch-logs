# serverless-offline-cloudwatch-logs

Serverless Framework plugin to emulate real-time cloudwatch log event subscriptions offline.

Specifically, with this, users will be able to attach functions to (offline) (cloudwatch) log events
- (offline) = locally, without ever hitting AWS/any cloud in any network
- (cloudwatch) = since Lambda automatically publishes to cloudwatch

Refer to https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html

## Usage

### Locally

This can be conveniently loaded / installed / linked locally for a Serverless project

1. Clone this repo
2. Create/clone a Serverless project in another directory
3. In the Serverless project, add this repo as a dependency
    a. In package.json of the Serverless project, add a line like this in devDependencies
        ```
        "serverless-offline-cloudwatch-logs": "file:../serverless-offline-cloudwatch-logs",
        ```
        or install it via npm
        ```
        npm install <LOCAL PATH TO serverless-offline-cloudwatch-logs PLUGIN>
        ```
    b. In serverless.yml or serverless.ts, add this plugin under the 'plugins' section

The plugin should now be linked to the Serverless project.
Any changes to the plugin (after they are built) will now show up in the Serverless project.
Hot-reloading processes to rebuild on saved chagnes can make this even more convenient, if desired.

## Development

index.js shouldn't need to be edited since it only exports the transpiled .ts file

primary development file is src/index.ts

after every change, run
```
$ npm run build
```
to run tsc a generate the build/index.js that the root index.js will export for Serverless projects to use via npm