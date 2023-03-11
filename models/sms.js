const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SmsSchema = new Schema({
  phone: String,
  email: String,
  fName: String,
  lName: String,
  ZipCode: String,
  Status: String, //"Pending" | "Submitted",
  results: String,
});

module.exports = Sms = mongoose.model("smstable", SmsSchema);
