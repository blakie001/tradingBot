let initialPrice = 500;
let stockHolding = false;
let balance = 1000;
let stockBought = 0;
let buyPrice = null;
let profitLoss = 0;

function newTrade (currentPrice) {
    currentPrice = parseFloat(currentPrice)

    console.log(`current Price : ${currentPrice}`);

    if(!initialPrice) {
        initialPrice = currentPrice;
        console.log(`Initial Price Set: ${initialPrice}`);
    }

    if(!stockHolding && currentPrice <= initialPrice * 0.98) // we can buy
    {
        console.log(`Stock Drop by 2%. Buying new Stock at: ${currentPrice}`);
        stockBought = Math.floor(balance / currentPrice);
        balance = balance - (stockBought * currentPrice);
        stockHolding = true;
        buyPrice = currentPrice;
        initialPrice = currentPrice

        console.log(`After trade -> Balance: ${balance}, StockBought: ${stockBought}, StockHolding: ${stockHolding}, ProfitLoss: ${profitLoss}`);

    }

    if(stockHolding && currentPrice >= initialPrice * 1.03) // we can sell
    {
        console.log(`Stock Raised by 3%. Selling Stock at: ${currentPrice}`);
        
        balance = balance + (stockBought * currentPrice); // al stock
        profitLoss = profitLoss +  (currentPrice - buyPrice) * stockBought;

        stockHolding = false;
        stockBought = 0;
        initialPrice = currentPrice;
        buyPrice = null;

        console.log(`After trade -> Balance: ${balance}, StockBought: ${stockBought}, StockHolding: ${stockHolding}, ProfitLoss: ${profitLoss}`);

    }


    return {
        balance,
        stockBought,
        stockHolding,
        profitLoss,

    };
}

module.exports = { newTrade };