const { newTrade } = require("../utils/calculation");
const axios = require("axios");

const API_KEY = process.env.API_KEY;

exports.getStockPriceAndTrade = async(req, res) =>{

    const symbol = req.query.symbol;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data['Time Series (1min)'];
        // console.log('Full API Response:', response.data);

        const stockData = response.data['Time Series (1min)'];
        const latestTime = Object.keys(stockData)[0];
        
        // if(!data) {
            //     return res.status(404).json("Stock not found");
            // }
            
        const currentPrice = stockData[latestTime]['1. open'];
        const tradeStatus = newTrade(currentPrice);

        return res.status(200).json({
            message: `Executed trading logic for ${symbol}`,
            price: currentPrice,
            balance: tradeStatus.balance,
            stockBought: tradeStatus.stockBought,
            stockHolding: tradeStatus.stockHolding,
            profitLoss: tradeStatus.profitLoss,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json("Error Fetching Stock Price and Executing Trade");
    }
} 