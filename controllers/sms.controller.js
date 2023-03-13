const axios = require("axios");
const Sms = require("../models/sms");

const validateSmsInput = require("../validation/sms");

exports.CreateClient = (req, res) => {
  const { errors, isValid } = validateSmsInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const sms = new Sms({
    phone: req.body.phone,
    email: req.body.email,
    fName: req.body.fName,
    lName: req.body.lName,
    ZipCode: req.body.ZipCode,
    Status: "Pending",
    results: "",
  });

  sms
    .save(sms)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the sms.",
      });
    });
};

exports.findAll = (req, res) => {
  //const userId = req.query.UserId;
  //var conditon = { UserId: userId };
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Sms.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Sms.",
      });
    });
};

exports.findOne = (req, res) => {
  const phone = req.params.phone;
  console.log("phone", phone);
  Sms.find({ phone: phone })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Sms with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Sms with id=" + id });
    });
};
exports.findOneChangeStatus = async (req, res) => {
  const phone = req.params.phone;
  const status = req.params.status;
  const filter = { phone: phone };
  const update = { status: status };
  console.log("phone", phone);
  console.log("status", status);
  console.log("filter", filter);
  console.log("update", update);

  const doc = await Sms.find(filter);
  doc.status = status;
  await doc.save;
  /*
  await Sms.findOneAndUpdate(filter, update, {
    returnOriginal: false,
  })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Sms with phone= " + phone });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Sms with phone=" + phone });
    });
    */
};

exports.SendSmsTest = (req, res) => {
  const phone = req.body.phone;
  const message = req.body.message;

  const apikey = require("../config/keys").apikey;
  const source = require("../config/keys").source;
  const payload = {
    apikey: apikey,
    source: source,
    destination: phone,
    messageText: message,
  };

  async function getJSONAsync() {
    await axios
      .post("https://api.voicetel.com/v2.1/messaging/sms/", payload)
      .then((resp) => {
        console.log(resp.data);
        res.send(resp.data);
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
        res.status(404).send(err);
      });
  }

  (async () => {
    await getJSONAsync();
    console.log(">>>>>>>>>>> abc");
  })();
};

exports.SendSms = async (req, res) => {
  const apikey = require("../config/keys").apikey;
  const source = require("../config/keys").source;
  const message = req.body.message;
  var smsMap = [];

  await Sms.find({ Status: "Pending" })
    .then((data) => {
      if (data) smsMap.push(data);
    })
    .catch((err) => {
      console.log("error:", err);
    });

  async function getJSONAsync(payload, sms) {
    await axios
      .post("https://api.voicetel.com/v2.1/messaging/sms/", payload)
      .then((resp) => {
        console.log("resp.data.statusCode", resp.data.statusCode);
        if (resp.data.statusCode === "200" && resp.data.status === "Success") {
          console.log("resp.data.statusCode 1", resp.data.statusCode);
          Sms.findByIdAndUpdate(sms._id, { Status: "Submitted" })
            .then((data) => {})
            .catch((err) => {});
        }
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
      });
  }

  smsMap[0].forEach((sms) => {
    const payload = {
      apikey: apikey,
      source: source,
      destination: sms.phone,
      messageText: message,
    };

    (async () => {
      await getJSONAsync(payload, sms);
      console.log(">>>>>>>>>>> abc");
    })();
  });
  res.send("Sent");
};
