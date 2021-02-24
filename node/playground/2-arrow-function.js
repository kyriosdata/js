const square = function (x) {
  return x * x;
};

const quadrado = (x) => x * x;

console.log(quadrado(3));

const evento = {
  host: "Fábio",
  guestList: ["André", "Paulo", "Maria"],
  printGuestList() {
    console.log("Guest list for " + this.host);
    this.guestList.forEach((guest) =>
      console.log(`${guest} is attending ${this.host}'s party`)
    );
  },
  alternativa: function () {
    console.log(this.host);
  },
};

evento.printGuestList();
evento.alternativa();
