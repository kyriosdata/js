/**
 * Código JavaScrit que será executado no navegador (cliente)
 */

console.log("app.js loaded...");

function getWeatherFor(endereco) {
  fetch("/weather?address=" + endereco)
    .then((r) =>
      r.json().then((j) => {
        if (j.error) {
          erro.innerHTML = j.error;
        } else {
          console.log(r.url);
          console.log(j.temperatura);
        }
      })
    )
    .catch((e) => console.log("CATCHING WORKING", e));
}

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const saida = document.getElementById("saida");
const erro = document.getElementById("erro");

getWeatherFor("goiania");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  getWeatherFor(search.value);
});
