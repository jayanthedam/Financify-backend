import { Router } from 'express';
import { createAsset, getAssets, updateAsset, deleteAsset, fetchStockPrices, fetchGoldPrice } from '../controllers/assetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, createAsset);
router.get('/', protect, getAssets);
router.put('/:id', protect, updateAsset);
router.delete('/:id', protect, deleteAsset);
router.get('/stock-prices', protect, fetchStockPrices);
router.get('/gold-price', protect, fetchGoldPrice);

export default router;
