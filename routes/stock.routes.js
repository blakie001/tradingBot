const express = require("express");
const priceController = require("../controllers/stock.controller");
const router = express.Router();

router.get("/", priceController.getStockPrice);

exports.router = router;