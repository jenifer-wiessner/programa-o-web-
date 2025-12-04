document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("carrossel");
  let perguntas = [];
  let indiceAtual = 0;
  const respostas = [];

  try {
      // Ajuste do caminho para seu src
      const response = await fetch("../../src/perguntas.php");
      const data = await response.json();

      if (!data.sucesso || !data.perguntas || data.perguntas.length === 0) {
          container.innerHTML = "<p>Nenhuma pergunta encontrada.</p>";
          return;
      }

      perguntas = data.perguntas;
      mostrarPergunta();
  } catch (error) {
      container.innerHTML = "<p>Erro ao carregar perguntas.</p>";
      console.error(error);
  }

  function mostrarPergunta() {
      if (indiceAtual === perguntas.length) {
          telaFinal();
          return;
      }

      const p = perguntas[indiceAtual];
      container.innerHTML = `
          <h2>${p.texto_pergunta}</h2>
          <div class="opcoes">
              ${[...Array(6).keys()].map(i => `<button class="opcao" data-valor="${i}">${i}</button>`).join("")}
          </div>
          <div class="navegacao">
              <button id="voltar" ${indiceAtual === 0 ? "disabled" : ""}>Voltar</button>
              <button id="proxima">Avançar</button>
          </div>
      `;

      const botoes = document.querySelectorAll(".opcao");
      botoes.forEach(btn => {
          btn.addEventListener("click", () => {
              botoes.forEach(b => b.classList.remove("selecionado"));
              btn.classList.add("selecionado");
          });
      });

      document.getElementById("voltar").addEventListener("click", () => {
          if (indiceAtual > 0) {
              indiceAtual--;
              mostrarPergunta();
          }
      });

      document.getElementById("proxima").addEventListener("click", () => {
          const selecionado = document.querySelector(".opcao.selecionado");
          if (!selecionado) {
              alert("Por favor, selecione uma nota antes de continuar.");
              return;
          }

          respostas[indiceAtual] = {
              id_pergunta: p.id_pergunta,
              resposta: parseInt(selecionado.dataset.valor),
              feedback: null,
              id_setor: 1,
              id_dispositivo: 1
          };

          indiceAtual++;
          mostrarPergunta();
      });
  }

  function telaFinal() {
      container.innerHTML = `
          <h2>Deseja deixar alguma observação sobre sua experiência?</h2>
          <textarea id="feedback" placeholder="Digite aqui sua observação (opcional)..."></textarea>
          <div class="navegacao">
              <button id="voltar">Voltar</button>
              <button id="enviar">Enviar</button>
          </div>
      `;

      document.getElementById("voltar").addEventListener("click", () => {
          indiceAtual--;
          mostrarPergunta();
      });

      document.getElementById("enviar").addEventListener("click", async () => {
          const textoFeedback = document.getElementById("feedback").value;
          if (respostas.length > 0) {
              respostas[respostas.length - 1].feedback = textoFeedback || null;
          }

          try {
              const envio = await fetch("../../src/respostas.php", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(respostas)
              });

              const resultado = await envio.json();

              if (resultado.sucesso) {
                  container.innerHTML = `
                      <h2>O Estabelecimento agradece sua resposta e ela é muito importante para nós, pois nos ajuda a melhorar continuamente nossos serviços.</h2>
                      <button class="voltar_inicio" id="refazer">
                          Voltar para perguntas
                      </button>
                  `;

                  document.getElementById("refazer").addEventListener("click", () => {
                      indiceAtual = 0;
                      respostas.length = 0;
                      mostrarPergunta();
                  });
              } else {
                  container.innerHTML = `<p>Erro ao enviar respostas: ${resultado.erro || ""}</p>`;
              }
          } catch (err) {
              container.innerHTML = "<p>Erro ao enviar respostas.</p>";
              console.error(err);
          }
      });
  }
});
