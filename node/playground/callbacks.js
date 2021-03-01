const add = (x, y, c) => setTimeout(() => c(x + y), 2000);

add(1, 4, console.log);
