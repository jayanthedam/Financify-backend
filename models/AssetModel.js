import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  assetType: {
    type: String,
    required: true,
    enum: ['gold', 'stocks', 'crypto', 'realestate', 'fd']
  },
  details: {
    // Gold
    quantity: Number,
    purchaseDate: Date,
    pricePerGram: Number,
    
    // Stocks
    companyName: String,
    ticker: String,
    shares: Number,
    pricePerShare: Number,
    
    // Crypto
    cryptocurrency: String,
    cryptoQuantity: Number,
    cryptoPrice: Number,
    
    // Real Estate
    propertyType: String,
    area: Number,
    purchasePrice: Number,
    
    // Fixed Deposit
    principalAmount: Number,
    interestRate: Number,
    maturityPeriod: Number
  }
}, {
  timestamps: true
});

const Asset = mongoose.model('Asset', assetSchema);
export default Asset;