let contador = 0;

const intervalo = setInterval(() => {
  contador += 1;
  console.log(contador);

  if (contador >= 10) {
    clearInterval(intervalo);
  }
}, 1000);