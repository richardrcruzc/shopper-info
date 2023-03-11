//const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const passport = require("passport");

const ValidationMiddleware = require("./middlewares/auth.validation.middleware");
const users = require("./routes/user.routes");
const clientRoutes = require("./routes/client.routes");

const app = express();

const smsRouter = require("./routes/sms.routes");

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
); // Use this after the variable declaration
// Bodyparser middleware
/*app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
*/
//app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes

app.use("/api/users", users);
//app.use("/api/sms", ValidationMiddleware.validJWTNeeded, smsRouter);

app.use("/api/sms", smsRouter);

app.use("/api/client", clientRoutes);

app.use((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

/*
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
