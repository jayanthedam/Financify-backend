import fetch from 'node-fetch';
import GoldPrice from '../models/GoldPriceModel.js';

export const updateGoldPrice = async () => {
  try {
    const response = await fetch("https://www.goldapi.io/api/XAU/INR", {
      headers: {
        "x-access-token": "goldapi-5z18ld4gkwkcydf4-io",
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    await GoldPrice.findOneAndUpdate(
      {}, 
      {
        price_gram_24k: data.price_gram_24k,
        price_gram_22k: data.price_gram_22k,
        price_gram_18k: data.price_gram_18k,
        lastUpdated: new Date()
      },
      { upsert: true }
    );
  } catch (error) {
    console.error('Error updating gold price:', error);
  }
};

export const getGoldPrice = async (req, res) => {
  try {
    const goldPrice = await GoldPrice.findOne().sort({ lastUpdated: -1 });
    if (!goldPrice) {
      return res.status(404).json({ message: 'Gold price not found' });
    }
    res.json(goldPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};