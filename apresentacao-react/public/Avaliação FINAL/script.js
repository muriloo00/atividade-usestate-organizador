const formulario = document.querySelector('#formulario');
const campoTarefa = document.querySelector('#tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const mensagem = document.querySelector('#mensagem');
const botaoLimparConcluidas = document.querySelector('#botao-limpar-concluidas');
const quantidadeTotal = document.querySelector('#quantidade-total');
const quantidadeFeitas = document.querySelector('#quantidade-feitas');
const quantidadePendentes = document.querySelector('#quantidade-pendentes');
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

tarefas.forEach((tarefa) => {
	tarefa.concluida = Boolean(tarefa.concluida);
});

function salvarTarefas() {
	localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function exibirMensagem(textoMensagem) {
	mensagem.textContent = textoMensagem;
}

function atualizarNumeros() {
	let tarefasConcluidas = 0;

	tarefas.forEach((tarefa) => {
		if (tarefa.concluida) {
			tarefasConcluidas++;
		}
	});

	quantidadeTotal.textContent = tarefas.length;
	quantidadeFeitas.textContent = tarefasConcluidas;
	quantidadePendentes.textContent = tarefas.length - tarefasConcluidas;
	botaoLimparConcluidas.disabled = tarefasConcluidas === 0;
}

function atualizarLista() {
	listaTarefas.innerHTML = '';

	tarefas.forEach((tarefa, indice) => {
		const item = document.createElement('li');
		const checkbox = document.createElement('input');
		const texto = document.createElement('span');
		const botaoExcluir = document.createElement('button');

		checkbox.type = 'checkbox';
		checkbox.className = 'checkbox-tarefa';
		checkbox.checked = tarefa.concluida;
		checkbox.setAttribute('aria-label', `Marcar tarefa como concluída: ${tarefa.titulo}`);
		texto.textContent = tarefa.titulo;
		botaoExcluir.type = 'button';
		botaoExcluir.className = 'botao-excluir';
		botaoExcluir.setAttribute('aria-label', `Excluir tarefa: ${tarefa.titulo}`);
		botaoExcluir.textContent = 'Excluir';

		checkbox.addEventListener('change', () => {
			tarefa.concluida = checkbox.checked;
			salvarTarefas();
			atualizarLista();
			exibirMensagem(`Tarefa "${tarefa.titulo}" atualizada.`);
		});

		botaoExcluir.addEventListener('click', () => {
			tarefas.splice(indice, 1);
			salvarTarefas();
			atualizarLista();
			exibirMensagem(`Tarefa "${tarefa.titulo}" excluída com sucesso!`);
		});

		item.classList.toggle('concluida', tarefa.concluida);
		item.append(checkbox, texto, botaoExcluir);
		listaTarefas.appendChild(item);
	});

	atualizarNumeros();
}

botaoLimparConcluidas.addEventListener('click', () => {
	let quantidadeRemovida = 0;

	tarefas.forEach((tarefa) => {
		if (tarefa.concluida) {
			quantidadeRemovida++;
		}
	});

	if (!quantidadeRemovida) {
		return;
	}

	tarefas = tarefas.filter((tarefa) => !tarefa.concluida);
	salvarTarefas();
	atualizarLista();
	exibirMensagem(`${quantidadeRemovida} tarefa(s) concluída(s) removida(s) com sucesso!`);
});

formulario.addEventListener('submit', (evento) => {
	evento.preventDefault();

	const titulo = campoTarefa.value.trim();

	if (!titulo) {
		campoTarefa.focus();
		return;
	}

	tarefas.push({ titulo, concluida: false });
	salvarTarefas();
	atualizarLista();
	exibirMensagem(`Tarefa "${titulo}" criada com sucesso!`);
	formulario.reset();
	campoTarefa.focus();
});

atualizarLista();
