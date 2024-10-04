const express = require("express");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

const stockRoute = require("./routes/stock.routes");
const tradingRoute = require("./routes/trading.routes");


app.use(stockRoute.router);
app.use(tradingRoute.router);

app.listen(PORT, () =>{
    console.log(`Server is Running on ${PORT}`);
})