function diferencaDias(data1, data2) {
  const primeira = new Date(data1);
  const segunda = new Date(data2);

  const umDia = 1000 * 60 * 60 * 24;
  const diferencaMs = Math.abs(segunda - primeira);

  return `${Math.floor(diferencaMs / umDia)} dias`;
}

console.log(diferencaDias("2026-01-01", "2026-01-15")); // 14 dias