const agenda = [];

function adicionarEvento(titulo, data, hora) {
  agenda.push({ titulo, data, hora });
}

function listarEventos() {
  return agenda.map((evento, index) => ({
    id: index + 1,
    titulo: evento.titulo,
    data: evento.data,
    hora: evento.hora,
  }));
}

function ordenarEventos() {
  agenda.sort((a, b) => {
    const dataA = new Date(`${a.data}T${a.hora}`);
    const dataB = new Date(`${b.data}T${b.hora}`);
    return dataA - dataB;
  });
}

function proximoEvento() {
  const agora = new Date();
  const futuros = agenda
    .map((evento) => ({
      ...evento,
      timestamp: new Date(`${evento.data}T${evento.hora}`).getTime(),
    }))
    .filter((evento) => evento.timestamp > agora.getTime())
    .sort((a, b) => a.timestamp - b.timestamp);

  return futuros.length > 0
    ? {
        titulo: futuros[0].titulo,
        data: futuros[0].data,
        hora: futuros[0].hora,
      }
    : null;
}

// Exemplo de uso:
adicionarEvento("Reunião", "2026-06-10", "14:00");
adicionarEvento("Dentista", "2026-05-30", "09:30");
adicionarEvento("Aniversário", "2026-06-01", "19:00");

ordenarEventos();
console.log("Eventos cadastrados:");
console.log(listarEventos());

console.log("Próximo evento:");
console.log(proximoEvento());