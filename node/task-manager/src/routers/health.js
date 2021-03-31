const express = require("express");
const mongoose = require("mongoose");

const router = new express.Router();

router.get("", (req, res) => {
  res.send({
    mongoose: mongoose.connection.readyState,
    user: process.env.MONGODB_USER,
    server: process.env.MONGODB_SERVER,
    port: process.env.MONGODB_PORT,
    dbname: process.env.MONGODB_DBNAME,
    instante: new Date(),
  });
});

module.exports = router;
