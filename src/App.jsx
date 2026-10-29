import { useState } from "react";

function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  function adicionarTarefa(evento) {
    evento.preventDefault();

    const textoLimpo = texto.trim();
    if (textoLimpo === "") {
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false,
    };

    setTarefas((anteriores) => [...anteriores, novaTarefa]);
    setTexto("");
  }

  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function removerTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id)
    );
  }

  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = total - concluidas;
  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }

    if (filtro === "concluidas") {
      return tarefa.concluida;
    }

    return true;
  });

  return (
    <main>
      <h1>Organizador de tarefas</h1>

      <form onSubmit={adicionarTarefa}>
        <label htmlFor="nova-tarefa">Nova tarefa</label>
        <input
          id="nova-tarefa"
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <p>
        Total: {total} | Concluídas: {concluidas} | Pendentes: {pendentes}
      </p>

      <nav aria-label="Filtrar tarefas">
        <button
          type="button"
          aria-pressed={filtro === "todas"}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          type="button"
          aria-pressed={filtro === "pendentes"}
          onClick={() => setFiltro("pendentes")}
        >
          Pendentes
        </button>
        <button
          type="button"
          aria-pressed={filtro === "concluidas"}
          onClick={() => setFiltro("concluidas")}
        >
          Concluídas
        </button>
      </nav>

      <ul>
        {tarefasVisiveis.length === 0 && (
          <li>Nenhuma tarefa para exibir.</li>
        )}
        {tarefasVisiveis.map((tarefa) => (
          <li key={tarefa.id}>
            <label>
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => alternarConclusao(tarefa.id)}
              />
              {tarefa.texto}
            </label>
            <button type="button" onClick={() => removerTarefa(tarefa.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
