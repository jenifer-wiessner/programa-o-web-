function calcular() {
  let n1 = parseFloat(document.getElementById("num1").value);
  let n2 = parseFloat(document.getElementById("num2").value);
  let op = document.getElementById("operacao").value;
  let res;

  switch (op) {
    case '+': res = n1 + n2; break;
    case '-': res = n1 - n2; break;
    case '*': res = n1 * n2; break;
    case '/': res = n2 !== 0 ? n1 / n2 : 'Erro (divisão por zero)'; break;
    default: res = "Operação inválida";
  }

  let campoResultado = document.getElementById("resultado");

  if (typeof res === "number" && !isNaN(res)) {
    campoResultado.textContent = res;

    if (res > 0) {
      campoResultado.style.background = "green";
      campoResultado.style.color = "white";
    } else if (res < 0) {
      campoResultado.style.background = "red";
      campoResultado.style.color = "white";
    } else {
      campoResultado.style.background = "gray";
      campoResultado.style.color = "white";
    }
  } else {
    campoResultado.textContent = res;
    campoResultado.style.background = "orange";
    campoResultado.style.color = "black";
  }
}