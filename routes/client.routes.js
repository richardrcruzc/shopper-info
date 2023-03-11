const sms = require("../controllers/sms.controller");

const express = require("express");
const clientRouter = express.Router();

clientRouter.post("/", sms.CreateClient);

module.exports = clientRouter;
