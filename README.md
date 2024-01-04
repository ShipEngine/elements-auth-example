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

2a. Start the application

```bash
npm start
```

```bash
yarn start
```

2b. Start application for development

```bash
npm dev
```

```bash
yarn dev
```

## How to Configure

The application uses an express server to serve your token generation requests, and uses [convict](https://github.com/mozilla/node-convict/tree/master) to manage configuration.

There are two ways to configure the application. The first is to manually edit the `config.js` file (located inside the `src` directory). The alternative way is to provide a json file with the configuration values.

### Configure through config.js

This file exports the result of calling convict with your configuration schema passed as an argument.
The configuration schema is an object with the configurationn fields as keys.

**Important:** currently the environment file needs to be called `.env` and must be at the root of the app directory

Each configuration field has an object value with the following properties.

- doc: Short description of the field **No need to edit**
- format: The type of value this holds **No need to edit**
- default: If you'd like to provide a default value for the field, this is the place **Note:** this is the value that will be used if none is provided through either env or json
- env: The environment field name where the value will be read from **Note:** this of course overrides the default value when provided
  - the value of this field needs to be the same as the key in your environment file

### Configure using json files

**Important:** currently the json file needs to be called `development.json` and needs to be inside the `config` directory

### Configuration Hierarchy

Since the application provides multiple ways to set your configuration values there can be some confusion as to what value your app ends up with. Keep in mind the following hierarchy when configuring your application.

environment variables -> json file -> config.js defaults

### Required Configuration Options

**Note:** Required fields do not provide default values

| Configuration Field     | Description                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **platformTokenIssuer** | Used to validate the source of the generated token. This value will be provided to you by your Account Manager after your public RSA key has been submitted.                                                  |
| **platformTokenKeyId**  | Used as an identifier for the public RSA key that was submitted to your Account Manager. This value will be provided to you by your Account Manager after your public RSA key has been submitted.             |
| **scope**               | Used to determine the permissions for the generated token. This value will be provided to you by your Account Manager.                                                                                        |
| **partnerId**           | Your ShipEngine Account Identification, unique to your organization, not to be confused with a tenantId. This is provided for you by your Account Manager when you register to the ShipEngine Partner program |

### Optional Configuration Options

| Configuration Field | Description                                                                                              | Default Value |
| ------------------- | -------------------------------------------------------------------------------------------------------- | ------------- |
| **port**            | The port number on which the application runs.                                                           | _1337_        |
| **tokenEndpoint**   | The endpoint for token generation requests.                                                              | _'/'_         |
| **tenantId**        | Tenant id can optionally be provided if tokens need to be generated only for one specific seller account | _Empty_       |

**Tip:** Documentation for all the fields outlined is described in the [Elements Guide Documentation](https://www.shipengine.com/docs/elements/elements-guide/#elements-jwt-generation)
