const sms = require("../controllers/sms.controller");

const express = require("express");
const smsRouter = express.Router();

//smsRouter.post("/", sms.CreateClient);
smsRouter.get("/all", sms.findAll);
smsRouter.post("/SendSmsTest", sms.SendSmsTest);

smsRouter.get("/phone/:phone", sms.findOne);
smsRouter.post("/SendSms", sms.SendSms);

module.exports = smsRouter;
