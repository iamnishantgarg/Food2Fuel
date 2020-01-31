const express = require("express");
const mongoose = require("mongoose");
const keys = require("./keys");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  return res.send("hello from server");
});

mongoose.connect(
  keys.MONGOURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(keys.PORT, () => {
      console.log(`listening to port:${keys.PORT}`);
    });
  }
);
