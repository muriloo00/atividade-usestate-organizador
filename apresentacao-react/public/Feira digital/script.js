const formulario = document.querySelector("#formulario");
const total = document.querySelector("#total");
const disponiveis = document.querySelector("#disponiveis");
const reservados = document.querySelector("#reservados");
const trocados = document.querySelector("#trocados");
const listaResumo = document.querySelector("#lista-resumo");
const filtroCategoria = document.querySelector("#filtro-categoria");
const mensagemSucesso = document.querySelector("#mensagem-sucesso");

let itens = [];
let proximoId = 1;

function atualizarResumo() {
  const categoriaSelecionada = filtroCategoria.value;
  let itensFiltrados = [];

  if (categoriaSelecionada === "") {
    itensFiltrados = itens;
  } else {
    for (let i = 0; i < itens.length; i++) {
      if (itens[i].categoria === categoriaSelecionada) {
        itensFiltrados.push(itens[i]);
      }
    }
  }

  let totalItens = 0;
  let totalDisponiveis = 0;
  let totalReservados = 0;
  let totalTrocados = 0;

  for (let i = 0; i < itensFiltrados.length; i++) {
    totalItens += 1;

    if (itensFiltrados[i].disponibilidade === "sim") {
      totalDisponiveis += 1;
    } else if (itensFiltrados[i].disponibilidade === "nao") {
      totalReservados += 1;
    } else if (itensFiltrados[i].disponibilidade === "trocado") {
      totalTrocados += 1;
    }
  }

  total.textContent = "Total: " + totalItens;
  disponiveis.textContent = "Disponíveis: " + totalDisponiveis;
  reservados.textContent = "Reservados: " + totalReservados;
  trocados.textContent = "Trocados: " + totalTrocados;

  listaResumo.innerHTML = "";

  const itensDisponiveis = [];

  for (let i = 0; i < itensFiltrados.length; i++) {
    if (itensFiltrados[i].disponibilidade === "sim") {
      itensDisponiveis.push(itensFiltrados[i]);
    }
  }

  for (let i = 0; i < itensDisponiveis.length; i++) {
    const itemResumo = document.createElement("li");

    itemResumo.innerHTML =
      "<strong>Nome:</strong> " +
      itensDisponiveis[i].nomeItem +
      "<br><strong>Categoria:</strong> " +
      itensDisponiveis[i].categoria +
      "<br><strong>Estado:</strong> " +
      itensDisponiveis[i].estado +
      "<br><strong>Responsável:</strong> " +
      itensDisponiveis[i].nomeResponsavel;

    if (itensDisponiveis[i].descricao) {
      itemResumo.innerHTML +=
        "<br><strong>Descrição:</strong> " + itensDisponiveis[i].descricao;
    }

    itemResumo.innerHTML +=
      '<div class="acoes-item">' +
      '<button type="button" class="botao-acao botao-reservar" data-action="reservar" data-id="' +
      itensDisponiveis[i].id +
      '">Reservar</button>' +
      '<button type="button" class="botao-acao botao-excluir" data-action="excluir" data-id="' +
      itensDisponiveis[i].id +
      '">Excluir</button>' +
      "</div>";

    listaResumo.appendChild(itemResumo);
  }
}

listaResumo.addEventListener("click", function (event) {
  const botao = event.target.closest("button[data-action]");

  if (!botao) {
    return;
  }

  const idItem = Number(botao.dataset.id);
  const acao = botao.dataset.action;

  if (acao === "reservar") {
    for (let i = 0; i < itens.length; i++) {
      if (itens[i].id === idItem) {
        itens[i].disponibilidade = "nao";
        break;
      }
    }

    mensagemSucesso.textContent = "Item reservado, agora tá segurado!";
    mensagemSucesso.classList.remove("escondida");
  }

  if (acao === "excluir") {
    itens = itens.filter(function (item) {
      return item.id !== idItem;
    });

    mensagemSucesso.textContent = "Item saiu da lista, foi embora!";
    mensagemSucesso.classList.remove("escondida");
  }

  atualizarResumo();
});

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomeResponsavel = document
    .getElementById("Nome do responsavel")
    .value.trim();
  const nomeItem = document.getElementById("Nome do item").value.trim();
  const categoria = document.getElementById("categoria do item").value;
  const estado = document.getElementById("estado de conservação").value;
  const disponibilidade = document.getElementById(
    "disponibilidade para troca",
  ).value;
  const descricao = document.getElementById("descricao do item").value.trim();

  if (!nomeResponsavel) {
    alert("Preencha todos os campos antes de enviar.");
    return;
  }

  if (!nomeItem) {
    alert("Preencha todos os campos antes de enviar.");
    return;
  }

  if (!categoria) {
    alert("Preencha todos os campos antes de enviar.");
    return;
  }

  if (!estado) {
    alert("Preencha todos os campos antes de enviar.");
    return;
  }

  if (!disponibilidade) {
    alert("Preencha todos os campos antes de enviar.");
    return;
  }

  itens.push({
    id: proximoId,
    nomeResponsavel: nomeResponsavel,
    nomeItem: nomeItem,
    categoria: categoria,
    estado: estado,
    disponibilidade: disponibilidade,
    descricao: descricao,
  });

  proximoId += 1;

  mensagemSucesso.textContent = "Item enviado com sucesso!";
  mensagemSucesso.classList.remove("escondida");
  atualizarResumo();
  formulario.reset();
});

filtroCategoria.addEventListener("change", atualizarResumo);
