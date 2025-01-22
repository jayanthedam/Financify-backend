import { Router } from 'express';
import { createAsset, getAssets, updateAsset, deleteAsset, fetchStockPrices, fetchGoldPrice, fetchHistoricalStockPrices, fetchCryptoPrices } from '../controllers/assetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, createAsset);
router.get('/', protect, getAssets);
router.put('/:id', protect, updateAsset);
router.delete('/:id', protect, deleteAsset);
router.get('/stock-prices', protect, fetchStockPrices);
router.get('/gold-price', protect, fetchGoldPrice);
router.get('/historical-stock-prices', protect, fetchHistoricalStockPrices);
router.get('/crypto-prices', protect, fetchCryptoPrices);

export default router;