const app = require("../src/app");
const request = require("supertest");

test("status", () => {
  request(app)
    .get("")
    .expect(200)
    .end(function (err, res) {
      if (err) throw err;
    });
});
