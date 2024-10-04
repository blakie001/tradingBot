const express = require("express");
const tradingController = require("../controllers/trading.controller");

const router = express.Router();

// router.get("/balance", tradingController.getCurrentBalance);

router.get("/trades", tradingController.getStockPriceAndTrade);

exports.router = router;