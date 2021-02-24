console.log("starting");

setTimeout(() => {
  console.log("?");
}, 0);

let naoAcabou = true;

setTimeout(() => {
  naoAcabou = false;
  console.log(naoAcabou);
}, 3000);

let contador = 0;
while (naoAcabou) {
  contador++;
  debugger;
  if (contador % 10000000 === 0) console.log(contador);
}
