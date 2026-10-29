function obterDiaSemana(dataTexto) {
  const data = new Date(dataTexto);
  const dias = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return dias[data.getDay()];
}

console.log(obterDiaSemana("2026-05-27")); // Quarta-feira