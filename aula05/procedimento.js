function adicionarLinhaMedia() {
  const tabela = document.getElementById("tabela");
  const tbody = tabela.querySelector("tbody");


  const linhaExistente = document.getElementById("linhaMedia");
  if (linhaExistente) linhaExistente.remove();

  const linhas = tbody.querySelectorAll("tr");
  const qtdColunas = linhas[0].querySelectorAll("td").length;

  const novaLinha = document.createElement("tr");
  novaLinha.id = "linhaMedia";

  const th = document.createElement("th");
  th.textContent = "Médias";
  novaLinha.appendChild(th);


  for (let col = 0; col < qtdColunas; col++) {
    let soma = 0, count = 0;
    linhas.forEach(linha => {
      const celula = linha.querySelectorAll("td")[col];
      if (celula && celula.textContent.trim() !== "") {
        const valor = parseFloat(celula.textContent);
        if (!isNaN(valor)) {
          soma += valor;
          count++;
        }
      }
    });
    const td = document.createElement("td");
    td.textContent = count > 0 ? (soma / count).toFixed(1) : "-";
    novaLinha.appendChild(td);
  }

  tbody.appendChild(novaLinha);
}


function adicionarColunaMedia() {
  const tabela = document.getElementById("tabela");
  const linhas = tabela.querySelectorAll("tbody tr");


  const thExistente = tabela.querySelector("thead tr:nth-child(1) th.mediaCol");
  if (thExistente) {
    let index = Array.from(thExistente.parentNode.children).indexOf(thExistente);
    tabela.querySelectorAll("tr").forEach(row => row.deleteCell(index));
  }


  tabela.querySelector("thead tr:nth-child(1)").insertAdjacentHTML("beforeend", `<th class="mediaCol" rowspan="2">Média</th>`);


  linhas.forEach(linha => {
    const celulas = linha.querySelectorAll("td");
    let soma = 0, count = 0;
    celulas.forEach(celula => {
      if (celula.textContent.trim() !== "") {
        const valor = parseFloat(celula.textContent);
        if (!isNaN(valor)) {
          soma += valor;
          count++;
        }
      }
    });
    const media = count > 0 ? (soma / count).toFixed(1) : "-";
    linha.insertAdjacentHTML("beforeend", `<td>${media}</td>`);
  });
}
