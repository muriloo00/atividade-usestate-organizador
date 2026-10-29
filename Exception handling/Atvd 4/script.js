const estado = {
  nome: "Visitante"
};

const inputNome = document.querySelector("#nome");
const perfilAtual = document.querySelector("#perfil-atual");
const mensagem = document.querySelector("#mensagem");

const btnSalvar = document.querySelector("#btn-salvar");
const btnCarregar = document.querySelector("#btn-carregar");
const btnCorromper = document.querySelector("#btn-corromper");
const btnLimpar = document.querySelector("#btn-limpar");

function renderizar() {
  perfilAtual.textContent = estado.nome;
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

function salvarPerfil() {
  try {
    const nome = inputNome.value.trim();

    if (nome === "") {
      throw new Error("Informe um nome para salvar o perfil.");
    }

    estado.nome = nome;
    localStorage.setItem("perfil_seguro", JSON.stringify(estado));

    renderizar();
    mostrarMensagem("Perfil salvo com sucesso.", "sucesso");
  } catch (erro) {
    mostrarMensagem("Não foi possível salvar: " + erro.message, "erro");
    console.error(erro);
  }
}

function carregarPerfil() {
  try {
    const textoSalvo = localStorage.getItem("perfil_seguro");

    if (textoSalvo === null) {
      throw new Error("Nenhum perfil salvo foi encontrado.");
    }

    const perfilConvertido = JSON.parse(textoSalvo);

    if (typeof perfilConvertido.nome !== "string" || perfilConvertido.nome.trim() === "") {
      throw new Error("O perfil salvo está corrompido.");
    }

    estado.nome = perfilConvertido.nome;
    mostrarMensagem("Perfil carregado com sucesso.", "sucesso");
  } catch (erro) {
    estado.nome = "Visitante";
    mostrarMensagem("Falha ao carregar: " + erro.message, "erro");
    console.error(erro);
  } finally {
    renderizar();
  }
}

function corromperDados() {
  localStorage.setItem("perfil_seguro", "{nome:Jogador}");
  mostrarMensagem("O dado foi corrompido. Tente carregá-lo.", "erro");
}

function limparDados() {
  localStorage.removeItem("perfil_seguro");
  estado.nome = "Visitante";
  inputNome.value = "";
  renderizar();
  mostrarMensagem("Dados removidos.", "sucesso");
}

btnSalvar.addEventListener("click", salvarPerfil);
btnCarregar.addEventListener("click", carregarPerfil);
btnCorromper.addEventListener("click", corromperDados);
btnLimpar.addEventListener("click", limparDados);

renderizar();