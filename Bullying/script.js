function verificarBullying(mensagem) {
  if (typeof mensagem !== "string") {
    return false;
  }

  const texto = mensagem
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const palavrasOfensivas = [
    "idiota",
    "otario",
    "burro",
    "retardado",
    "feio",
    "gordo",
    "pobre",
    "vagabundo",
    "vagabunda",
    "desgraça",
    "desgraca",
    "inferior",
    "matar",
    "assassinar",
    "ameacar",
    "ofender",
    "xingar"
  ];

  const padroesDeBullying = [
    /\b(sem vergonha|vai tomar no cu|vai se ferrar|vai morrer|merece morrer)\b/,
    /\b(you are|stupid|idiot|moron|loser)\b/
  ];

  const contemOfensa = palavrasOfensivas.some((palavra) => texto.includes(palavra));
  const contemPadrao = padroesDeBullying.some((padrao) => padrao.test(texto));

  return !(contemOfensa || contemPadrao);
}

// Exemplo de uso:
// console.log(verificarBullying("Você é incrível!"));
// console.log(verificarBullying("Você é um idiota!"));
