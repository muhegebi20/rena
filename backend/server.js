require("dotenv").config();
const express = require("express");
const data = require("./services/db.json");
const app = express();
const port = 3000;
const axios = require("axios");

app.use(express.json());

const API_KEY = process.env.API_KEY;
const url = "https://www.goldapi.io/api/XAU/USD";

async function GetGoldPrice(url) {
  try {
    let response = await axios.get(url, {
      headers: {
        "x-access-token": API_KEY,
        "Content-Type": "application/json",
      },
    });
    return response.data.price;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

function calculatePrice(product, gold_Price) {
  return (product.popularityScore + 1) * product.weight * gold_Price;
}

async function updatePrice(req, res, next) {
  try {
    let goldPrice = await GetGoldPrice(url);

    data.forEach((product) => {
      product.price = calculatePrice(product, goldPrice);
    });
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to update prices" });
  }
}

app.get("/", updatePrice, (req, res) => {
  res.json({
    products: data,
  });
});

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
