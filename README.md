# elements-auth-example

Example application for handling ShipEngine Elements authentication token requests.

## Pre-requisites

- node.js
- yarn preferably but npm will work
- The following shipengine credentials
  - token issuer
  - partner api key
  - scope
- A private rsa key that matches the public key that has been submited to your ShipEngine Account Manager
- A tenant id must be generated before hand and provided to the application. [Official Documentation](https://www.shipengine.com/docs/partners/accounts/create/)

## How to Start

1. Install dependencies

```bash
npm install
```

```bash
yarn
```

2. Start the application

```bash
npm start
```

```bash
yarn start
```

## How to Configure

The application uses an express server to serve your token generation requests, and uses [convict](https://github.com/mozilla/node-convict/tree/master) to manage configuration. The configuration is located in the `config` folder. The `default.json` file contains the default configuration. The `local.json` file is used for local development and is git ignored. The `production.json` file is used for production and is git ignored.

### Required Configuration Options

| Configuration Field | Description  | Default Value |
| ------------------- | ------------ | ------------- |
| platformTokenIssuer | Placeholder. | Placeholder   |
| platformTokenKeyId  | Placeholder. | Placeholder   |
| scope               | Placeholder. | Placeholder   |
| partnerId           | Placeholder. | Placeholder   |
| scope               | Placeholder. | Placeholder   |

### Optional Configuration Options

| Configuration Field | Description                                    | Default Value |
| ------------------- | ---------------------------------------------- | ------------- |
| port                | The port number on which the application runs. | 1337          |
| tokenEndpoint       | The endpoint for token generation requests.    | '/'           |
| tenantId            | Placeholder.                                   | Placeholder   |
