const express = require("express");

const router = new express.Router();

router.get("/health", (req, res) => {
  res.send({ msg: "OK", geradoEm: new Date().toString() });
});

module.exports = router;
