const app = require("../src/app");
const request = require("supertest");

test("status", async () => {
  await request(app).get("").expect(200);
});
