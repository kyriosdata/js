const payload = (msg, autor = "Admin") => ({
  autor,
  msg,
  geradoEm: new Date().getTime(),
});

module.exports = payload;
