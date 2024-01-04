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

There are two ways to configure the application. The first is to manually edit the `config.js` file (located inside the `src` directory). The alternative way is to provide a json file with the configuration values.

### Configure through config.js

### Configure using json files

### Required Configuration Options

**Note:** Required fields do not provide default values

| Configuration Field     | Description                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **platformTokenIssuer** | Used to validate the source of the generated token. This value will be provided to you by your Account Manager after your public RSA key has been submitted.                                                  |
| **platformTokenKeyId**  | Used as an identifier for the public RSA key that was submitted to your Account Manager. This value will be provided to you by your Account Manager after your public RSA key has been submitted.             |
| **scope**               | Used to determine the permissions for the generated token. This value will be provided to you by your Account Manager.                                                                                        |
| **partnerId**           | Your ShipEngine Account Identification, unique to your organization, not to be confused with a tenantId. This is provided for you by your Account Manager when you register to the ShipEngine Partner program |

### Optional Configuration Options

| Configuration Field | Description                                    | Default Value |
| ------------------- | ---------------------------------------------- | ------------- |
| **port**            | The port number on which the application runs. | _1337_        |
| **tokenEndpoint**   | The endpoint for token generation requests.    | _'/'_         |
| **tenantId**        | Placeholder.                                   | _Placeholder_ |

**Tip:** Documentation for all the fields outlined is described in the [Elements Guide Documentation](https://www.shipengine.com/docs/elements/elements-guide/#elements-jwt-generation)
