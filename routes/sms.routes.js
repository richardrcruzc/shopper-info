const sms = require("../controllers/sms.controller");

const express = require("express");
const smsRouter = express.Router();

//smsRouter.post("/", sms.CreateClient);
smsRouter.get("/phone/:phone/newstatus/:status", sms.findOneChangeStatus);

smsRouter.get("/all", sms.findAll);
smsRouter.post("/SendSmsTest", sms.SendSmsTest);

smsRouter.get("/phone/:phone", sms.findOne);
smsRouter.post("/SendSms", sms.SendSms);
smsRouter.post("/ClearSms", sms.ClearSms);

smsRouter.post("/BulkSms", sms.BulkSms);
smsRouter.post("/updateStatus", sms.UpdateStatus);

module.exports = smsRouter;
