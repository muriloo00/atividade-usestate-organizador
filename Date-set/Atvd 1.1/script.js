const agora = new Date();

const dia = String(agora.getDate()).padStart(2, "0");
const mes = String(agora.getMonth() + 1).padStart(2, "0");
const ano = agora.getFullYear();
const hora = String(agora.getHours()).padStart(2, "0");
const minuto = String(agora.getMinutes()).padStart(2, "0");

console.log(`${dia}/${mes}/${ano} ${hora}:${minuto}`);