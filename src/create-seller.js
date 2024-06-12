import axios from "axios";

const shipengineApiUrl = process.env.SHIPENGINE_API_URL;
const shipenginePartnerApiKey = process.env.SHIPENGINE_PARTNER_API_KEY;

const shipengineClient = axios.create({
  baseURL: shipengineApiUrl,
  headers: {
    "API-Key": shipenginePartnerApiKey,
  },
});

/**
 * Creates a new ShipEngine seller account as described at https://www.shipengine.com/docs/partners/accounts/create/
 */
export const createSeller = async (
  first_name,
  last_name,
  email,
  company_name,
  external_account_id,
  origin_country_code = "US"
) => {
  const response = await shipengineClient.post("/v1/partners/accounts", {
    first_name,
    last_name,
    email,
    company_name,
    external_account_id,
    origin_country_code,
  });

  console.log("Created ShipEngine Seller Account: ", response.data);

  return response.data;
};
