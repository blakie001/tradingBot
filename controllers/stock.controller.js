const axios = require("axios");

const API_KEY = process.env.API_KEY;

exports.getStockPrice = async(req, res) =>{

    const symbol = req.query.symbol;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data['Time Series (1min)'];

        if(!data) {
            return res.status(404).json("Stock Not Available !");
        }

        const lastTime = Object.keys(data)[0];
        const lastData = data[lastTime];

        return res.json({
            symbol: symbol,
            price: parseFloat(lastData['1. open']), // last price
            timestamp: lastTime            
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json("Failed to Fetch Stock Price");
    }
}