import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import assetRoutes from './routes/assetRoutes.js';
import goldRoutes from './routes/goldRoutes.js';
import cryptoRoutes from './routes/cryptoPriceRoutes.js'
import { updateGoldPrice } from './controllers/goldController.js';
import cron from 'node-cron';

dotenv.config();

const app = express();
const port = 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

cron.schedule('0 0 * * *', () => { updateGoldPrice()});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/assets', assetRoutes); 
app.use('/api/gold-price', goldRoutes);
app.use('/api/crypto-prices',cryptoRoutes);


app.listen(port, () =>{ console.log(`Server started on port ${port}`)});
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import userRoutes from './routes/userRoutes.js';
// import assetRoutes from './routes/assetRoutes.js';
// import goldRoutes from './routes/goldRoutes.js';
// import { updateGoldPrice } from './controllers/goldController.js';
// import cron from 'node-cron';
// import updateCryptoPrices from './cronJobs/updateCryptoPrices.js';

// dotenv.config();

// const app = express();
// const port = 5000;

// // Connect to database
// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Schedule gold price update once per day at midnight
// cron.schedule('0 0 * * *', () => {
//   updateGoldPrice();
// });

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/assets', assetRoutes); 
// app.use('/api/gold-price', goldRoutes);

// app.listen(port, () =>{ console.log(`Server started on port ${port}`);
// updateCryptoPrices();});
