function iniciarContagemRegressiva(dataFutura) {
  const destino = new Date(dataFutura);

  const intervalo = setInterval(() => {
    const agora = new Date();
    const diferenca = destino - agora;

    if (diferenca <= 0) {
      console.log("O tempo acabou!");
      clearInterval(intervalo);
      return;
    }

    const segundosTotais = Math.floor(diferenca / 1000);
    const dias = Math.floor(segundosTotais / 86400);
    const horas = Math.floor((segundosTotais % 86400) / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;

    console.clear();
    console.log("Faltam:");
    console.log(`${dias} dias`);
    console.log(`${horas} horas`);
    console.log(`${minutos} minutos`);
    console.log(`${segundos} segundos`);
  }, 1000);
}

iniciarContagemRegressiva("2026-12-31T23:59:59");