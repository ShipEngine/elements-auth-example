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
