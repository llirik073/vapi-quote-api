
import express from "express";
import { paymentMiddleware } from "@x402/express";
import {
  x402ResourceServer,
  HTTPFacilitatorClient
} from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

const app = express();
const PORT = process.env.PORT || 3000;

const PAY_TO = "0x40C581FE1d2d8Ff7a29393ba0B4c0153cBE6e38B";

const facilitator = new HTTPFacilitatorClient({
  url: "https://facilitator.payai.network"
});

const resourceServer = new x402ResourceServer(facilitator);
resourceServer.register("eip155:8453", new ExactEvmScheme());

app.get("/", (req, res) => {
  res.json({
    name: "vAPI Quote API",
    status: "online",
    version: "1.1.0",
    payment: "x402"
  });
});

app.use(
  paymentMiddleware(
    {
      "GET /quote": {
        accepts: {
          scheme: "exact",
          price: "$0.001",
          network: "eip155:8453",
          payTo: PAY_TO
        },
        description: "Get a random inspirational quote",
        mimeType: "application/json"
      }
    },
    resourceServer
  )
);

const quotes = [
  "Every great idea starts with one small step.",
  "Keep learning and building every day.",
  "Small progress is still progress.",
  "The best time to start is now.",
  "Success comes from consistency."
];

app.get("/quote", (req, res) => {
  const quote = quotes[
    Math.floor(Math.random() * quotes.length)
  ];

  res.json({
    quote,
    source: "vAPI Quote API"
  });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
