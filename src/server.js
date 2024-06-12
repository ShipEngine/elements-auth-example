import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

import { generateToken } from "./generate-token.js";
import { createSeller } from "./create-seller.js";

const app = express();
app.use(cors());

const port = process.env.PORT;
const tokenEndpoint = process.env.TOKEN_ENDPOINT;
const sellerEndpoint = process.env.SELLER_ENDPOINT;

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

app.post(sellerEndpoint, bodyParser.json(), async (req, res) => {
  try {
    const body = req.body;
    console.log("Creating seller with: ", body);

    const seller = await createSeller(
      body.firstName,
      body.lastName,
      body.email,
      body.company,
      body.accountId,
      body.country
    );

    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  console.log(`Path for token generation is: ${tokenEndpoint}`);
  console.log(`Path for seller creation is: ${sellerEndpoint}`);
});
