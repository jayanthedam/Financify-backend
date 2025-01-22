import cron from 'node-cron';
import fetch from 'node-fetch';
import Asset from '../models/AssetModel.js';

const updateCryptoPrices = async () => {
  try {
    const apiKey = process.env.COINLAYER_API_KEY;
    const response = await fetch(`http://api.coinlayer.com/live?access_key=${apiKey}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error.info);
    }

    const assets = await Asset.find({ assetType: 'crypto' });

    for (const asset of assets) {
      const closePrice = data.rates[asset.details.cryptocurrency];
      asset.details.cryptoPrice = closePrice;
      await asset.save();
    }

    console.log('Crypto prices updated successfully');
  } catch (error) {
    console.error('Error updating crypto prices:', error.message);
  }
};

// Schedule the job to run once a day at midnight
cron.schedule('0 0 * * *', updateCryptoPrices);

export default updateCryptoPrices;