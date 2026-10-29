const form = document.querySelector('#formLivro');
const listaLivros = document.querySelector('#listaLivros');
const tituloInput = document.querySelector('#titulo');
const autorInput = document.querySelector('#autor');
const anoInput = document.querySelector('#ano');
const paginasInput = document.querySelector('#paginas');
const botaoCadastro = document.querySelector('#botaoCadastro');

let livros = [];

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

function recuperarLivros() {
    try {
        const dadosArmazenados = localStorage.getItem('livros');

        if (!dadosArmazenados) {
            return [];
        }

        const dados = JSON.parse(dadosArmazenados);

        if (!Array.isArray(dados)) {
            throw new Error('Formato inválido para a lista de livros.');
        }

        return dados;
    } catch (erro) {
        console.error('Erro ao recuperar livros:', erro);
        return [];
    }
}

function salvarLivros(livrosParaSalvar) {
    try {
        localStorage.setItem('livros', JSON.stringify(livrosParaSalvar));
        return true;
    } catch (erro) {
        console.error('Erro ao salvar livros:', erro);
        return false;
    }
}

function renderizarLivros() {
    listaLivros.innerHTML = '';

    livros.forEach((livro) => {
        const item = document.createElement('li');
        item.textContent = `${livro.titulo} — ${livro.autor} (${livro.ano}) — ${livro.paginas} páginas`;
        listaLivros.appendChild(item);
    });
}

livros = recuperarLivros();
renderizarLivros();

form.addEventListener('submit', function (evento) {
    evento.preventDefault();

    botaoCadastro.disabled = true;
    botaoCadastro.textContent = 'Processando...';

    try {
        const titulo = validarTextoCampo(tituloInput.value, 'Título do livro');
        const autor = validarTextoCampo(autorInput.value, 'Autor');
        const ano = validarAno(anoInput.value);
        const paginas = validarPaginas(paginasInput.value);

        const novoLivro = criarLivro(titulo, autor, ano, paginas);
        const novaLista = [...livros, novoLivro];

        const salvou = salvarLivros(novaLista);

        if (!salvou) {
            throw new Error('Não foi possível salvar o livro.');
        }

        livros = novaLista;
        renderizarLivros();

        form.reset();
        tituloInput.focus();
    } catch (erro) {
        alert(erro.message);
    } finally {
        botaoCadastro.disabled = false;
        botaoCadastro.textContent = 'Cadastrar livro';
    }
});
