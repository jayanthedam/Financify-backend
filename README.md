# Financify Backend

## Overview
Backend server for Financify - a comprehensive portfolio management system that handles user authentication, asset management, and real-time market data integration.

## Features
- JWT Authentication
- RESTful API endpoints
- Real-time market data integration
- Multi-asset portfolio management
- Scheduled tasks for price updates

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Node-cron for scheduled tasks

## API Integrations
- Finnhub API (Stock data)
- GoldAPI (Gold prices)
- Crypto API (Cryptocurrency prices)

## Setup
1. Clone the repository
```bash
git clone https://github.com/jayanthedam/Financify-backend.git
cd Financify-backend
```
## Install Dependencies 
```bash
npm install
```
## Create .env file
```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
FINNHUB_API_KEY=your_finnhub_api_key
GOLDAPI_KEY=your_gold_api_key
```
## Run development server
```bash
npm start
```
## API Endpoints
- User Routes
- POST /api/users/register - Register user
- POST /api/users/login - Login user
## Asset Routes
- GET /api/assets - Get all assets
- POST /api/assets - Create asset
- PUT /api/assets/:id - Update asset
- DELETE /api/assets/:id - Delete asset
- GET /api/assets/stock-prices - Get stock prices
- GET /api/assets/gold-price - Get gold prices
## Crypto Routes
- GET /api/crypto-prices - Get cryptocurrency prices
