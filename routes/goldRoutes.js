import { Router } from 'express';
import { getGoldPrice } from '../controllers/goldController.js';

const router = Router();
router.get('/', getGoldPrice);

export default router;

// import { Router } from 'express';
// import { getGoldPrice, updateGoldPrice } from '../controllers/goldController.js';

// const router = Router();
// router.get('/', getGoldPrice);

// // Temporary route to manually trigger the updateGoldPrice function
// router.post('/update', async (req, res) => {
//   try {
//     await updateGoldPrice();
//     res.status(200).json({ message: 'Gold price updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;