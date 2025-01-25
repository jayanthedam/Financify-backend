import CryptoPrice from '../models/cryptoPriceModel.js';
import Asset from '../models/AssetModel.js';

const fetchCryptoPrices = async (req, res) => {
  try {
    // Get user's crypto assets
    const userCryptoAssets = await Asset.find({ 
      user: req.user._id,
      assetType: 'crypto'
    });

    // Get latest crypto prices
    const cryptoPrices = await CryptoPrice.find({
      cryptocurrency: { 
        $in: userCryptoAssets.map(asset => asset.details.cryptocurrency) 
      }
    }).sort({ updatedAt: -1 });

    // Calculate total value
    let totalCryptoValue = 0;
    userCryptoAssets.forEach(asset => {
      const currentPrice = cryptoPrices.find(
        cp => cp.cryptocurrency === asset.details.cryptocurrency
      )?.price || 0;
      totalCryptoValue += currentPrice * asset.details.cryptoQuantity;
    });

    res.json({ 
      cryptoPrices,
      totalCryptoValue,
      assets: userCryptoAssets 
    });
  } catch (error) {
    console.error('Crypto price fetch error:', error);
    res.status(500).json({ message: error.message });
  }
};

export { fetchCryptoPrices };
