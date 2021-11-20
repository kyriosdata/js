//
// PASSO 1
//

const passo1 = [];

function combinacoes(vetor, tamanho, inicio, resultado) {
  if (tamanho == 0) {
    passo1.push(resultado.slice());
    return;
  }

  for (let i = inicio; i <= vetor.length - tamanho; i++) {
    resultado[resultado.length - tamanho] = vetor[i];
    combinacoes(vetor, tamanho - 1, i + 1, resultado);
  }
}

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const resposta = [0, 0, 0, 0];
combinacoes(numeros, 4, 0, resposta);

console.log("Passo 1 (total)", passo1.length);

//
// PASSO 2
//

const passo2 = passo1.filter((c) => c[0] + c[1] + c[2] + c[3] == 34);
console.log("Passo 2 (total)", passo2.length);

//
// PASSO 3
//

const candidatas = matrizesComLinhasSatisfeitas(passo2);
console.log("Passo 3 (total)", candidatas.length);

function matrizesComLinhasSatisfeitas(somas34) {
  const relevantes = [];
  const total = somas34.length;
  for (let a = 0; a < total; a++) {
    for (let b = a + 1; b < total; b++) {
      for (let c = b + 1; c < total; c++) {
        for (let d = c + 1; d < total; d++) {
          if (elementosDistintos(somas34, a, b, c, d)) {
            const relevante = [];
            relevante.push(somas34[a], somas34[b], somas34[c], somas34[d]);
            relevantes.push(relevante);
          }
        }
      }
    }
  }

  return relevantes;
}

//
// PASSO 4
//

verificarDerivadas(candidatas);

function verificarDerivadas(consideradas) {
  let conta = 0;
  let solucoes = 0;
  for (const candidata of consideradas) {
    const linhas1 = geraPermutacoes(candidata[0]);
    const linhas2 = geraPermutacoes(candidata[1]);
    const linhas3 = geraPermutacoes(candidata[2]);
    const linhas4 = geraPermutacoes(candidata[3]);

    for (const l1 of linhas1) {
      for (const l2 of linhas2) {
        for (const l3 of linhas3) {
          for (const l4 of linhas4) {
            conta++;
            if (colunas34(l1, l2, l3, l4) && diagonais34(l1, l2, l3, l4)) {
              console.log("\n\n");
              console.log(l1);
              console.log(l2);
              console.log(l3);
              console.log(l4);
              solucoes++;
            }
          }
        }
      }
    }
  }
  console.log("Total de matrizes verificadas", conta);
  console.log("Total de soluções encontradas", solucoes);
}

function colunas34(l1, l2, l3, l4) {
  for (let c = 0; c < 4; c++) {
    const soma = l1[c] + l2[c] + l3[c] + l4[c];
    if (soma != 34) {
      return false;
    }
  }

  return true;
}

function diagonais34(l1, l2, l3, l4) {
  const d1 = l1[0] + l2[1] + l3[2] + l4[3];
  if (d1 != 34) {
    return false;
  }

  const d2 = l1[3] + l2[2] + l3[1] + l4[0];
  if (d2 != 34) {
    return false;
  }

  return true;
}

function geraPermutacoes(elementos) {
  const permutacoes = [];
  permutacoes.push(elementos);
  const indexes = [0, 0, 0, 0];
  const n = 4;
  let i = 0;
  while (i < n) {
    if (indexes[i] < i) {
      swap(elementos, i % 2 == 0 ? 0 : indexes[i], i);
      permutacoes.push(elementos.slice());
      indexes[i]++;
      i = 0;
    } else {
      indexes[i] = 0;
      i++;
    }
  }

  return permutacoes;
}

function swap(vetor, a, b) {
  const tmp = vetor[a];
  vetor[a] = vetor[b];
  vetor[b] = tmp;
}

function elementosDistintos(entrada, a, b, c, d) {
  const ocorrencias = new Array(17).fill(0);

  if (encontradaSimilaridade(ocorrencias, entrada[a])) {
    return false;
  }

  if (encontradaSimilaridade(ocorrencias, entrada[b])) {
    return false;
  }

  if (encontradaSimilaridade(ocorrencias, entrada[c])) {
    return false;
  }

  if (encontradaSimilaridade(ocorrencias, entrada[d])) {
    return false;
  }

  return true;
}

function encontradaSimilaridade(contadores, vetor) {
  for (const elemento of vetor) {
    if (contadores[elemento] > 0) {
      return true;
    }

    contadores[elemento] = 1;
  }

  return false;
}
