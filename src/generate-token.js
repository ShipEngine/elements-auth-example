import fs from "fs";
import jsonwebtoken from "jsonwebtoken";

const keyName = process.env.PRIVATE_KEY_FILENAME;
const platformKey = process.env.PRIVATE_KEY;
const issuer = process.env.PLATFORM_TOKEN_ISSUER;
const keyid = process.env.PLATFORM_TOKEN_KEY_ID;
const scope = process.env.SCOPE;
const partner = process.env.SHIPENGINE_PARTNER_ID;
const defaultTenant = process.env.SHIPENGINE_TENANT_ID;

export const generateToken = async (tenantId) => {
  const tenant = tenantId || defaultTenant;
  const payload = {
    partner,
    tenant,
    scope,
  };

  let secretKey;

  try {
    secretKey = platformKey || fs.readFileSync(keyName, "utf-8");
    if (!secretKey) throw new Error("Missing secret key");
  } catch (error) {
    console.error("Problem with the key provided");
    console.error({ error });

    throw new Error(
      "Problem with the key provided. Make sure you either pass the key as a string or provide a valid file path"
    );
  }

  const token = await jsonwebtoken.sign(payload, secretKey, {
    algorithm: "RS256",
    expiresIn: 3600,
    issuer,
    keyid,
  });

  return token;
};
