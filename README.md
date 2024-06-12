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

or

```bash
yarn
```

2. Start the application

- a. Start application for production

```bash
npm start
```

or

```bash
yarn start
```

- b. Start application for development

```bash
npm dev
```

or

```bash
yarn dev
```

## How to Configure

The application uses an express server to serve your token generation requests, and uses the `dotenv` package to read your configuration values from a `.env` file.

You'll need to provide a .env file at the root of the project directory.

A template `.env` file is provided in the root of the repository as `.env.template`. You can copy this file and rename it to `.env` and fill in the required values.

Here is an example of the final product in case you need it, the only value that may need attention is the `PRIVATE_KEY` as it is a multi-line string.
Example of environment file (`.env`)

```env
PRIVATE_KEY_FILENAME=value
PLATFORM_TOKEN_ISSUER=value
PLATFORM_TOKEN_KEY_ID=value
SCOPE=value
SHIPENGINE_PARTNER_ID=value
SHIPENGINE_PARTNER_API_KEY=value
SHIPENGINE_TENANT=value
PORT=value
PATH_GENERATE_TOKEN=/value
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
multiple
line
value
-----END PRIVATE KEY-----"
```

### Required Configuration Options

The `.env.template` provides comments to guide you along the process, but in case you want a more detailed reference, refer to the chart below

**Note:** Required fields do not provide default values

| Configuration Field            | Description                                                                                                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **PLATFORM_TOKEN_ISSUER**      | Used to validate the source of the generated token. This value will be provided to you by your Account Manager after your public RSA key has been submitted.                                                       |
| **PLATFORM_TOKEN_KEY_ID**      | Used as an identifier for the public RSA key that was submitted to your Account Manager. This value will be provided to you by your Account Manager after your public RSA key has been submitted.                  |
| **SCOPE**                      | Used to determine the permissions for the generated token. This value will be provided to you by your Account Manager.                                                                                             |
| **SHIPENGINE_PARTNER_ID**      | Your ShipEngine Account Identification, unique to your organization, not to be confused with a tenantId. This is provided for you by your Account Manager when you register to the ShipEngine Partner program.     |
| **SHIPENGINE_PARTNER_API_KEY** | Your ShipEngine API key unique to your organization, not to be confused with an individual seller's API key. This is provided for you by your Account Manager when you register to the ShipEngine Partner program. |

### Optional Configuration Options

| Configuration Field      | Description                                                                                              | Default Value       |
| ------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------- |
| **PORT**                 | The port number on which the application runs.                                                           | _3002_              |
| **TOKEN_ENDPOINT**       | The endpoint for token generation requests.                                                              | _'/generate-token'_ |
| **SELLER_ENDPOINT**      | The endpoint for new tenant (seller) creation requests.                                                  | _'/create-seller'_  |
| **SHIPENGINE_TENANT_ID** | Tenant id can optionally be provided if tokens need to be generated only for one specific seller account | _Empty_             |

**Tip:** Documentation for all the fields outlined is described in the [Elements Guide Documentation](https://www.shipengine.com/docs/elements/elements-guide/#elements-jwt-generation)

## How to Use

Once the server is running, it can be used to both generate authentication tokens needed for Elements, as well as creating new ShipEngine seller accounts.

### Generate a Token

To generate an authentication token to be used with Elements, send a `GET` request to the configured `TOKEN_ENDPOINT`, adding the ShipEngine Seller account ID as the `tenantId` to the path. For the default configuration this would be:

```text
GET http://localhost:3002/generate-token/{tenantId}
```

If you have configured a default seller account with `SHIPENGINE_TENANT_ID`, the `tenantId` path variable can be omitted:

```text
GET http://localhost:3002/generate-token
```

### Create a New Seller Account

To create a new seller account, send a `POST` request to the configured `SELLER_ENDPOINT`. For the default configuration, this would be:

```text
POST http://localhost:3002/create-seller
```

The body of the request should contain a JSON object with the account properties:

```js
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "jdoe@example.com",
    "company": "ShipCo",
    "accountId": "12345",
    "country": "US"
}
```

Below are the properties that may be sent in the request body. All properties are optional:

| Body Field    | Description                                                                                                                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **firstName** | The given name of the seller. If not provided, a random value will be generated.                                                                                                                                                                      |
| **lastName**  | The family name of the seller. If not provided, a random value will be generated.                                                                                                                                                                     |
| **email**     | The email address for the seller. This value must be unique, and account creation will fail if a duplicate value is used. If an address is not provided, a unique value will be generated based on the contact address within your partner account.   |
| **company**   | The seller's company name. If not provided, this will be set based on your partner account.                                                                                                                                                           |
| **accountId** | An optional external account ID. This can be set to the user's account ID within your own system, which will allow you to look up the seller account using that external ID using the ShipEngine API. If not provided, this field will be left empty. |
| **country**   | The two-character country code for the seller's home country. If not provided, this will default to `"US"`.                                                                                                                                           |

This request will respond with the ShipEngine seller object as described in the [Shipengine API Documentation](https://www.shipengine.com/docs/partners/accounts/create/). The most important value returned for the general Elements use case is the `account_id` property, which must be used as the `tenantId` when generating a token for this seller.
