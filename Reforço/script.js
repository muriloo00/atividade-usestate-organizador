const formFilme = document.getElementById('formFilme');
const inputTitulo = document.getElementById('titulo');
const listaFilmes = document.getElementById('listaFilmes');
const chaveStorage = 'filmes';

let filmes = lerFilmes();

function lerFilmes() {
  const dados = localStorage.getItem(chaveStorage);
  return dados ? JSON.parse(dados) : [];
}

function salvarFilmes() {
  localStorage.setItem(chaveStorage, JSON.stringify(filmes));
}

function renderizarFilmes() {
  listaFilmes.innerHTML = '';

  if (filmes.length === 0) {
    const item = document.createElement('li');
    item.className = 'vazio';
    item.textContent = 'Nenhum filme cadastrado ainda.';
    listaFilmes.appendChild(item);
    return;
  }

  filmes.forEach((filme) => {
    const item = document.createElement('li');

    const info = document.createElement('div');
    info.className = 'filme-info';

    const titulo = document.createElement('strong');
    titulo.textContent = filme.titulo;

    const status = document.createElement('span');
    status.className = 'status';
    status.textContent = filme.assistido ? 'Assistido' : 'Não assistido';

    info.appendChild(titulo);
    info.appendChild(status);

    const botoes = document.createElement('div');
    botoes.className = 'botoes';

    const botaoStatus = document.createElement('button');
    botaoStatus.textContent = filme.assistido ? 'Marcar como não assistido' : 'Marcar como assistido';
    botaoStatus.className = 'btn-status';
    botaoStatus.dataset.id = filme.id;

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.className = 'btn-excluir';
    botaoExcluir.dataset.id = filme.id;

    botoes.appendChild(botaoStatus);
    botoes.appendChild(botaoExcluir);

    item.appendChild(info);
    item.appendChild(botoes);
    listaFilmes.appendChild(item);
  });
}

formFilme.addEventListener('submit', (event) => {
  event.preventDefault();

  const titulo = inputTitulo.value.trim();

  if (!titulo) {
    alert('Digite o nome de um filme.');
    return;
  }

  const novoFilme = {
    id: Date.now(),
    titulo: titulo,
    assistido: false
  };

  filmes.push(novoFilme);
  salvarFilmes();
  renderizarFilmes();
  formFilme.reset();
  inputTitulo.focus();
});

listaFilmes.addEventListener('click', (event) => {
  const botao = event.target;

  if (botao.classList.contains('btn-status')) {
    const id = Number(botao.dataset.id);
    filmes = filmes.map((filme) => {
      if (filme.id === id) {
        return { ...filme, assistido: !filme.assistido };
      }
      return filme;
    });

    salvarFilmes();
    renderizarFilmes();
  }

  if (botao.classList.contains('btn-excluir')) {
    const id = Number(botao.dataset.id);
    filmes = filmes.filter((filme) => filme.id !== id);

    salvarFilmes();
    renderizarFilmes();
  }
});

renderizarFilmes();
