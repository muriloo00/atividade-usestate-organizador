const form = document.querySelector('#formLivro');
const listaLivros = document.querySelector('#listaLivros');
const tituloInput = document.querySelector('#titulo');
const autorInput = document.querySelector('#autor');
const anoInput = document.querySelector('#ano');
const paginasInput = document.querySelector('#paginas');
const botaoCadastro = document.querySelector('#botaoCadastro');

function limparTexto(texto) {
    return texto.trim().replace(/\s+/g, ' ');
}

function validarTextoCampo(valor, nomeCampo) {
    const texto = limparTexto(valor);

    if (!texto) {
        throw new Error(`${nomeCampo} é obrigatório.`);
    }

    if (texto.length < 3) {
        throw new Error(`${nomeCampo} deve ter pelo menos 3 caracteres.`);
    }

    return texto;
}

function validarAno(valor) {
    const texto = limparTexto(valor);

    if (!texto) {
        throw new Error('Ano de publicação é obrigatório.');
    }

    if (!/^\d+$/.test(texto)) {
        throw new Error('Ano de publicação deve ser um número inteiro.');
    }

    const ano = Number(texto);
    const anoAtual = new Date().getFullYear();

    if (ano < 1450 || ano > anoAtual) {
        throw new Error('Ano de publicação deve estar entre 1450 e o ano atual.');
    }

    return ano;
}

function validarPaginas(valor) {
    const texto = limparTexto(valor);

    if (!texto) {
        throw new Error('Quantidade de páginas é obrigatória.');
    }

    if (!/^\d+$/.test(texto)) {
        throw new Error('Quantidade de páginas deve ser um número inteiro.');
    }

    const paginas = Number(texto);

    if (paginas < 1) {
        throw new Error('Quantidade de páginas deve ser maior que 0.');
    }

    return paginas;
}

function criarLivro(titulo, autor, ano, paginas) {
    return {
        titulo,
        autor,
        ano,
        paginas
    };
}

function adicionarLivroNaLista(livro) {
    const item = document.createElement('li');
    item.textContent = `${livro.titulo} — ${livro.autor} (${livro.ano}) — ${livro.paginas} páginas`;
    listaLivros.appendChild(item);
}

form.addEventListener('submit', function (evento) {
    evento.preventDefault();

    botaoCadastro.disabled = true;
    botaoCadastro.textContent = 'Processando...';

    try {
        const titulo = validarTextoCampo(tituloInput.value, 'Título do livro');
        const autor = validarTextoCampo(autorInput.value, 'Autor');
        const ano = validarAno(anoInput.value);
        const paginas = validarPaginas(paginasInput.value);

        const livro = criarLivro(titulo, autor, ano, paginas);
        adicionarLivroNaLista(livro);

        form.reset();
        tituloInput.focus();
    } catch (erro) {
        alert(erro.message);
    } finally {
        botaoCadastro.disabled = false;
        botaoCadastro.textContent = 'Cadastrar livro';
    }
});
