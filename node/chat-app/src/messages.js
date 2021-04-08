const payload = (msg) => ({
  msg,
  geradoEm: new Date().getTime(),
});

module.exports = payload;
