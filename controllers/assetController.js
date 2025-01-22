import fetch from 'node-fetch';
import Asset from '../models/AssetModel.js';

const createAsset = async (req, res) => {
  try {
    const asset = new Asset({
      user: req.user._id,
      assetType: req.body.assetType,
      details: req.body.details
    });

    const createdAsset = await asset.save();
    res.status(201).json(createdAsset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user._id });
    res.json(assets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    if (asset.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAsset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    if (asset.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Asset.deleteOne({ _id: req.params.id });
    res.json({ message: 'Asset removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const fetchStockPrices = async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user._id, assetType: 'stocks' });
    let totalValue = 0;
    const apikey = process.env.FINNHUB_API_KEY;
    for (const asset of assets) {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${asset.details.ticker}&token=${apikey}`);
      const data = await response.json();
      const closePrice = data.c; // Current price
      totalValue += closePrice * asset.details.shares;
    }

    res.json({ totalStockValue: totalValue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchGoldPrice = async (req, res) => {
  try {
    const response = await fetch('https://www.goldapi.io/api/XAU/INR', {
      headers: {
        'x-access-token': process.env.GOLD_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.json({ goldPrice: data.price_gram_24k });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchHistoricalStockPrices = async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user._id, assetType: 'stocks' });
    const historicalData = {};
    const apiKey = process.env.POLYGON_API_KEY; // Replace with your Polygon.io API key

    for (const asset of assets) {
      const ticker = asset.details.ticker;
      if (!ticker) {
        console.error(`Ticker not found for asset: ${asset._id}`);
        continue;
      }

      try {
        const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.status === 'OK') {
          historicalData[ticker] = data.results;
        } else {
          console.error(`Error fetching data for ${ticker}: ${data.status}`);
        }
      } catch (fetchError) {
        console.error(`Network error fetching data for ${ticker}: ${fetchError.message}`);
      }
    }

    res.json(historicalData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchCryptoPrices = async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user._id, assetType: 'crypto' });
    let totalValue = 0;
    const apiKey = process.env.COINLAYER_API_KEY;

    const response = await fetch(`http://api.coinlayer.com/live?access_key=${apiKey}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error.info);
    }

    for (const asset of assets) {
      const closePrice = data.rates[asset.details.cryptocurrency];
      totalValue += closePrice * asset.details.cryptoQuantity;
    }

    res.json({ totalCryptoValue: totalValue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { fetchCryptoPrices, fetchHistoricalStockPrices, fetchStockPrices, fetchGoldPrice, createAsset, getAssets, updateAsset, deleteAsset };