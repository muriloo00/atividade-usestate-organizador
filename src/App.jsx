import { useState } from "react";
import "./App.css";

const filtros = [
  { valor: "todas", rotulo: "Todas" },
  { valor: "pendentes", rotulo: "Pendentes" },
  { valor: "concluidas", rotulo: "Concluídas" },
];

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("todas");

  const total = tarefas.length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = total - concluidas;
  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtroAtivo === "pendentes") {
      return !tarefa.concluida;
    }

    if (filtroAtivo === "concluidas") {
      return tarefa.concluida;
    }

    return true;
  });

  function adicionarTarefa(evento) {
    evento.preventDefault();

    const textoLimpo = texto.trim();
    if (!textoLimpo) {
      return;
    }

    setTarefas((anteriores) => [
      ...anteriores,
      {
        id: `${Date.now()}-${anteriores.length}`,
        texto: textoLimpo,
        concluida: false,
      },
    ]);
    setTexto("");
  }

  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa,
      ),
    );
  }

  function removerTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id),
    );
  }

  return (
    <main className="task-app">
      <header className="task-header">
        <span className="task-eyebrow">Organize seu dia</span>
        <h1>Minhas tarefas</h1>
        <p>Adicione tarefas, acompanhe seu progresso e mantenha o foco.</p>
      </header>

      <section className="task-panel" aria-label="Organizador de tarefas">
        <form className="task-form" onSubmit={adicionarTarefa}>
          <label className="visually-hidden" htmlFor="nova-tarefa">
            Nova tarefa
          </label>
          <input
            id="nova-tarefa"
            className="task-input"
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
            placeholder="O que você precisa fazer?"
            autoComplete="off"
          />
          <button className="add-button" type="submit" disabled={!texto.trim()}>
            Adicionar
          </button>
        </form>

        <div className="task-summary" aria-live="polite">
          <div className="summary-item">
            <span className="summary-number">{total}</span>
            <span className="summary-label">Total</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{pendentes}</span>
            <span className="summary-label">Pendentes</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">{concluidas}</span>
            <span className="summary-label">Concluídas</span>
          </div>
        </div>

        <div className="task-toolbar">
          <h2>Lista de tarefas</h2>
          <div className="filter-list" aria-label="Filtrar tarefas">
            {filtros.map((filtro) => (
              <button
                className={`filter-button${filtroAtivo === filtro.valor ? " is-active" : ""}`}
                key={filtro.valor}
                type="button"
                aria-pressed={filtroAtivo === filtro.valor}
                onClick={() => setFiltroAtivo(filtro.valor)}
              >
                {filtro.rotulo}
              </button>
            ))}
          </div>
        </div>

        {tarefasVisiveis.length === 0 ? (
          <div className="empty-state" role="status">
            <span className="empty-icon" aria-hidden="true">
              ✓
            </span>
            <p>
              {total === 0
                ? "Sua lista está vazia. Adicione uma tarefa para começar."
                : "Nenhuma tarefa neste filtro."}
            </p>
          </div>
        ) : (
          <ul className="task-list">
            {tarefasVisiveis.map((tarefa) => (
              <li
                className={`task-item${tarefa.concluida ? " is-complete" : ""}`}
                key={tarefa.id}
              >
                <label className="task-label">
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={tarefa.concluida}
                    onChange={() => alternarConclusao(tarefa.id)}
                  />
                  <span>{tarefa.texto}</span>
                </label>
                <button
                  className="remove-button"
                  type="button"
                  aria-label={`Remover tarefa: ${tarefa.texto}`}
                  onClick={() => removerTarefa(tarefa.id)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
