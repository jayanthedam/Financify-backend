import mongoose from 'mongoose';

const goldPriceSchema = new mongoose.Schema({
  price_gram_24k: Number,
  price_gram_22k: Number,
  price_gram_18k: Number,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('GoldPrice', goldPriceSchema);