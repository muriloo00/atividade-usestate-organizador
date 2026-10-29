const inputNome = document.querySelector("#nome");
const inputIdade = document.querySelector("#idade");
const btnCadastrar = document.querySelector("#btn-cadastrar");
const mensagem = document.querySelector("#mensagem");
const statusBotao = document.querySelector("#status");

function validarInscricao(nome, idade) {
  if (nome === "") {
    throw new Error("O nome é obrigatório.");
  }

  if (!Number.isInteger(idade)) {
    throw new Error("A idade deve ser um número inteiro.");
  }

  if (idade < 14 || idade > 18) {
    throw new Error("A idade deve estar entre 14 e 18 anos.");
  }
}

btnCadastrar.addEventListener("click", function() {
  btnCadastrar.disabled = true;
  statusBotao.textContent = "Status do botão: bloqueado durante o cadastro";

  try {
    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);

    validarInscricao(nome, idade);

    mensagem.textContent = `Inscrição realizada com sucesso para ${nome}.`;
    mensagem.className = "mensagem sucesso";
  } catch (erro) {
    mensagem.textContent = erro.message;
    mensagem.className = "mensagem erro";
  } finally {
    btnCadastrar.disabled = false;
    statusBotao.textContent = "Status do botão: liberado";
  }
});