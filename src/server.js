import fs from "fs";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import express from "express";
import "dotenv/config";

const app = express();

const generateToken = async () => {
  const payload = {
    partner: process.env.SHIPENGINE_PARTNER_ID,
    tenant: process.env.SHIPENGINE_SELLER_ID,
    scope: process.env.SCOPE,
  };

  const secretKey = fs.readFileSync(process.env.PRIVATE_KEY_FILENAME, "utf-8");

  if (!secretKey) throw new Error("Missing secret key");

  const token = await jsonwebtoken.sign(payload, secretKey, {
    algorithm: "RS256",
    expiresIn: 3600,
    issuer: process.env.PLATFORM_TOKEN_ISSUER,
    keyid: process.env.PLATFORM_TOKEN_KEY_ID,
  });

  return token;
};

const generateTokenPath = process.env.PATH_GENERATE_TOKEN || "/generate-token";
app.get(generateTokenPath, async (_req, res) => {
  const token = await generateToken();

  res.status(200).json({ token });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
  console.log(
    `Path for token generation is: ${process.env.PATH_GENERATE_TOKEN}`
  );
});
