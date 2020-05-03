const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");

const routes = require("./routes/api");
const users = require("./routes/users");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true,  useUnifiedTopology: true  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended:false
  })
)

app.use(bodyParser.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/users", users)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
