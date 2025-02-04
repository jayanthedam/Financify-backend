import CryptoPrice from '../models/CryptoPriceModel.js';
import Asset from '../models/AssetModel.js';


const updateCryptoPrices = async () => {
  try {
    const response = await axios.get(`http://api.coinlayer.com/live?access_key=${process.env.COINLAYER_API_KEY}`);
    const prices = response.data.rates;

    // Update the database with the fetched prices
    for (const [symbol, price] of Object.entries(prices)) {
      await Crypto.findOneAndUpdate(
        { symbol },
        { price },
        { upsert: true, new: true }
      );
    }

    console.log('Crypto prices updated successfully');
  } catch (error) {
    console.error('Failed to fetch crypto prices', error);
  }
};

const fetchCryptoPrices = async (req, res) => {
  try {
    const userCryptoAssets = await Asset.find({ 
      user: req.user._id,
      assetType: 'crypto'
    });

    console.log('User Crypto Assets:', userCryptoAssets);

    const cryptoPrices = await CryptoPrice.find({
      cryptocurrency: { 
        $in: userCryptoAssets.map(asset => asset.details.cryptocurrency) 
      }
    }).sort({ updatedAt: -1 });

    console.log('Crypto Prices:', cryptoPrices);

    let totalCryptoValue = 0;
    userCryptoAssets.forEach(asset => {
      const currentPrice = cryptoPrices.find(
        cp => cp.cryptocurrency === asset.details.cryptocurrency
      )?.price || 0;
      totalCryptoValue += currentPrice * (asset.details.quantity || 0);
    });

    console.log('Total Crypto Value:', totalCryptoValue);

    res.json({ 
      cryptoPrices,
      totalCryptoValue: totalCryptoValue || 0,
      assets: userCryptoAssets 
    });
  } catch (error) {
    console.error('Crypto price fetch error:', error);
    res.status(500).json({ message: error.message });
  }
};


export { fetchCryptoPrices };
