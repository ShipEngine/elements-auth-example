import convict from "convict";
import path from "path";
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default convict({
  privateKeyFileName: {
    doc: "File name of the private key used to sign the token",
    format: String,
    default: null,
    env: "PRIVATE_KEY_FILENAME",
  },
  platformKey: {
    doc: "Private key used to sign the token in string format",
    format: String,
    default: null,
    env: "PRIVATE_KEY",
  },
  platformTokenIssuer: {
    doc: "Issuer provided by your shipengine contact",
    format: String,
    default: "elements-auth",
    env: "PLATFORM_TOKEN_ISSUER",
  },
  platformTokenKeyId: {
    doc: "Key ID provided by your shipengine contact",
    format: String,
    default: "default token key id",
    env: "PLATFORM_TOKEN_KEY_ID",
  },
  scope: {
    doc: "Scope for the token",
    format: String,
    default: "default scope",
    env: "SCOPE",
  },
  partnerId: {
    doc: "Partner ID provided by your shipengine contact",
    format: String,
    default: "default partner id",
    env: "SHIPENGINE_PARTNER_ID",
  },
  tenant: {
    doc: "Seller ID generated by you for your user",
    format: String,
    default: "default tenant",
    env: "SHIPENGINE_TENANT",
  },
  port: {
    doc: "Port the server should listen on",
    format: "port",
    default: 1337,
    env: "PORT",
  },
  tokenEndpoint: {
    doc: "The endpoint users generate their token at",
    format: String,
    default: "/",
    env: "TOKEN_ENDPOINT",
  },
}).loadFile(path.join(__dirname, "../config/development.json"));
