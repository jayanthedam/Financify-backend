import express from  'express';
import { fetchCryptoPrices } from '../controllers/cryptoPriceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, fetchCryptoPrices) ;

export default router;
