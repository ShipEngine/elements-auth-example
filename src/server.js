import fs from "fs";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import express from "express";
import "dotenv/config";

const app = express();

const keyName = process.env.PRIVATE_KEY_FILENAME;
const platformKey = process.env.PLATFORM_KEY;
const issuer = process.env.PLATFORM_TOKEN_ISSUER;
const keyid = process.env.PLATFORM_TOKEN_KEY_ID;
const scope = process.env.SCOPE;
const partner = process.env.SHIPENGINE_PARTNER_ID;
const defaultTenant = process.env.TENANT_ID;
const port = process.env.PORT;
const tokenEndpoint = process.env.TOKEN_ENDPOINT;


const generateToken = async (tenantId) => {
  const tenant = tenantId || defaultTenant;
  const payload = {
    partner,
    tenant,
    scope,
  };

  const secretKey = platformKey || fs.readFileSync(keyName, "utf-8");

  try {
    if (!secretKey) throw new Error("Missing secret key");
  } catch (error) {
    console.error("Problem with the key provided");
    console.error({ error });

    throw new Error("Problem with the key provided. Make sure you either pass the key as a string or provide a valid file path");
  }

  const token = await jsonwebtoken.sign(payload, secretKey, {
    algorithm: "RS256",
    expiresIn: 3600,
    issuer,
    keyid,
  });

  return token;
};

app.get(`${tokenEndpoint}/:tenantId`, async (req, res) => {
  let tenant = req.params.tenantId;
  try {
    const token = await generateToken(tenant);
  
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error })
  }
});

app.get(tokenEndpoint, async (_, res) => {
  try {
    const token = await generateToken();

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error })
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  console.log(`Path for token generation is: ${tokenEndpoint}`);
});
