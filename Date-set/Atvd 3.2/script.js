function verificarVencimento(dataVencimento) {
  const hoje = new Date();
  const vencimento = new Date(dataVencimento);

  return hoje > vencimento ? "Vencido" : "Dentro do prazo";
}

console.log(verificarVencimento("2025-12-01")); 