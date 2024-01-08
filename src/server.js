import fs from "fs";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import express from "express";
import "dotenv/config";
import config from "./config.js";
import cors from "cors";

const app = express();

app.use(cors());

const privateKeyFileName = config.get("privateKeyFileName");
const privateKey = config.get("privateKey");
const issuer = config.get("platformTokenIssuer");
const keyid = config.get("platformTokenKeyId");
const scope = config.get("scope");
const partner = config.get("partnerId");
const defaultTenant = config.get("tenantId");
const port = config.get("port");
const tokenEndpoint = config.get("tokenEndpoint");

const generateToken = async (tenantId) => {
  const tenant = tenantId || defaultTenant;
  const payload = {
    partner,
    tenant,
    scope,
  };

  const secretKey =
    privateKey.replace(/\n\s*/g, "\n") ||
    fs.readFileSync(privateKeyFileName, "utf-8");

  try {
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

app.get(`${tokenEndpoint}/:tenantId`, async (req, res) => {
  let tenant = req.params.tenantId;
  try {
    const token = await generateToken(tenant);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get(tokenEndpoint, async (_, res) => {
  try {
    const token = await generateToken();

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  console.log(`Path for token generation is: ${tokenEndpoint}`);
});
