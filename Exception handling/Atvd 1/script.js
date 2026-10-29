const inputDividendo = document.querySelector("#dividendo");
const inputDivisor = document.querySelector("#divisor");
const btnCalcular = document.querySelector("#btn-calcular");
const resultado = document.querySelector("#resultado");

btnCalcular.addEventListener("click", function () {
  try {
    const dividendo = Number(inputDividendo.value);
    const divisor = Number(inputDivisor.value);

    if (inputDividendo.value === "" || inputDivisor.value === "") {
      throw new Error("Preencha os dois campos.");
    }

    if (divisor === 0) {
      throw new Error("Não é possível dividir por zero.");
    }

    const calculo = dividendo / divisor;
    resultado.textContent = `Resultado: ${calculo}`;
    resultado.className = "mensagem sucesso";
  } catch (erro) {
    resultado.textContent = `Erro: ${erro.message}`;
    resultado.className = "mensagem erro";
    console.error(erro);
  }
});
