const adiciona = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("apenas positivos");
      }

      resolve(a + b);
    }, 500);
  });
};

test("async with feito", (feito) => {
  setTimeout(() => {
    expect(1).toBe(1);
    feito();
  }, 200);
});

test("outro async com feito", (feito) => {
  adiciona(2, 3).then((total) => {
    expect(total).toBe(5);
    feito();
  });
});

test("async com await", async () => {
  const total = await adiciona(2, 4);
  expect(total).toBe(6);
});
