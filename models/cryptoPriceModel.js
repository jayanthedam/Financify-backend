import mongoose from 'mongoose';

const cryptoPriceSchema = mongoose.Schema(
  {
    cryptocurrency: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const CryptoPrice = mongoose.model('CryptoPrice', cryptoPriceSchema);

export default CryptoPrice;
