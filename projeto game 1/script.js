const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const playerScoreEl = document.getElementById("playerScore");
const cpuScoreEl = document.getElementById("cpuScore");
const levelValueEl = document.getElementById("levelValue");
const speedValueEl = document.getElementById("speedValue");
const messageElement = document.getElementById("message");
const staminaFillEl = document.getElementById("staminaFill");
const staminaValueEl = document.getElementById("staminaValue");
const dashStatusEl = document.getElementById("dashStatus");
const staminaWrapEl = document.querySelector(".stamina-wrap");

const keys = {};
const world = { state: "ready", lastTime: 0 };

let playerPad;
let cpuPad;
let ball;
let playerScore;
let cpuScore;
let level;
let speedMultiplier;
let powerUps;
let playerShield;
let dashCooldown;
let dashTimer;
let stamina;
let dashUses;
let cpuDashCooldown;
let cpuDashTimer;
let ballPause;
let nextBallVelocity;

function resetGame() {
  playerPad = { x: canvas.width / 2 - 70, y: canvas.height - 28, width: 140, height: 16, speed: 7 };
  cpuPad = { x: canvas.width / 2 - 70, y: 12, width: 140, height: 16, speed: 5.2 };
  ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, vx: 4.6, vy: 4.6 };
  playerScore = 0;
  cpuScore = 0;
  level = 1;
  speedMultiplier = 1;
  playerShield = 0;
  powerUps = [];
  dashCooldown = 0;
  dashTimer = 0;
  stamina = 100;
  dashUses = 0;
  cpuDashCooldown = 0;
  cpuDashTimer = 0;
  ballPause = 0;
  nextBallVelocity = null;
  updateHud();
}

function updateHud() {
  playerScoreEl.textContent = String(playerScore);
  cpuScoreEl.textContent = String(cpuScore);
  levelValueEl.textContent = String(level);
  speedValueEl.textContent = `${speedMultiplier.toFixed(1)}x`;
  const staminaPercent = Math.round(Math.max(0, Math.min(100, stamina)));
  staminaFillEl.style.width = `${staminaPercent}%`;
  staminaValueEl.textContent = `${staminaPercent}%`;
  staminaWrapEl.classList.toggle("cooldown", dashCooldown > 0.35);
  staminaWrapEl.classList.toggle("active", dashTimer > 0);
  staminaWrapEl.classList.toggle("low", staminaPercent < 35 && dashCooldown <= 0.35);

  if (dashCooldown > 0.35) {
    dashStatusEl.textContent = `RECARREGANDO ${dashCooldown.toFixed(1)}s`;
  } else if (staminaPercent < 35) {
    dashStatusEl.textContent = "SEM ENERGIA";
  } else if (dashUses === 1) {
    dashStatusEl.textContent = "1 DASH RESTANTE";
  } else {
    dashStatusEl.textContent = "PRONTO";
  }
}

function startGame() {
  resetGame();
  world.state = "playing";
  world.lastTime = performance.now();
  messageElement.textContent = "Bola na jogada!";
  requestAnimationFrame(loop);
}

function loop(time) {
  if (world.state !== "playing") {
    draw();
    return;
  }

  const delta = Math.min((time - world.lastTime) / 16.67, 2.2);
  world.lastTime = time;

  update(delta);
  draw();
  requestAnimationFrame(loop);
}

function update(delta) {
  dashCooldown = Math.max(0, dashCooldown - delta / 60);
  cpuDashCooldown = Math.max(0, cpuDashCooldown - delta / 60);
  if (dashTimer > 0) {
    dashTimer -= delta / 60;
  }
  if (cpuDashTimer > 0) {
    cpuDashTimer -= delta / 60;
  }

  if (ballPause > 0) {
    ballPause = Math.max(0, ballPause - delta / 60);
    if (ballPause === 0 && nextBallVelocity) {
      ball.vx = nextBallVelocity.vx;
      ball.vy = nextBallVelocity.vy;
      nextBallVelocity = null;
      messageElement.textContent = "Bola na jogada!";
    }
  }

  if (dashTimer <= 0 && stamina < 100) {
    stamina = Math.min(100, stamina + delta * 0.55);
  }

  const moveX = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
  const moveY = (keys.s || keys.arrowdown ? 1 : 0) - (keys.w || keys.arrowup ? 1 : 0);

  const boost = dashTimer > 0 ? 2.3 : 1;
  playerPad.x += moveX * playerPad.speed * delta * boost;
  playerPad.y += moveY * playerPad.speed * delta * boost;

  playerPad.x = Math.max(30, Math.min(canvas.width - playerPad.width - 30, playerPad.x));
  playerPad.y = Math.max(canvas.height - 150, Math.min(canvas.height - 28, playerPad.y));

  if (keys[" "] && dashCooldown <= 0 && dashTimer <= 0 && stamina >= 35) {
    stamina = Math.max(0, stamina - 35);
    dashUses += 1;
    dashCooldown = dashUses === 2 ? 2 : 0.35;
    dashTimer = 0.2;
    if (dashUses === 2) {
      stamina = 0;
      dashUses = 0;
      messageElement.textContent = "2 DASHES! Aguarde 2s.";
    } else {
      messageElement.textContent = "DASH! Mais 1 disponível.";
    }
  }

  const cpuDir = ball.x > cpuPad.x + cpuPad.width / 2 ? 1 : -1;
  const cpuDifficulty = 1 + (level - 1) * 0.2;
  const cpuDistance = Math.abs(ball.x - (cpuPad.x + cpuPad.width / 2));
  const ballApproachingCpu = ball.vy < 0 && ball.y < cpuPad.y + 180;
  if (ballApproachingCpu && cpuDistance > 90 && cpuDashCooldown <= 0 && Math.random() < 0.025 * cpuDifficulty) {
    cpuDashTimer = 0.22;
    cpuDashCooldown = Math.max(1.8, 3.2 - (level - 1) * 0.25);
  }
  const cpuBoost = cpuDashTimer > 0 ? 2.5 : 1;
  cpuPad.x += cpuDir * cpuPad.speed * delta * 0.9 * cpuDifficulty * cpuBoost;
  cpuPad.x = Math.max(30, Math.min(canvas.width - cpuPad.width - 30, cpuPad.x));

  if (Math.random() < Math.max(0.004, 0.008 - (level - 1) * 0.001)) {
    const types = ["speed", "wide", "shield"];
    const type = types[Math.floor(Math.random() * types.length)];
    powerUps.push({
      type,
      x: 50 + Math.random() * (canvas.width - 100),
      y: 60 + Math.random() * (canvas.height - 160),
      radius: 12,
      active: true,
    });
  }

  for (let i = powerUps.length - 1; i >= 0; i -= 1) {
    const item = powerUps[i];
    if (!item.active) continue;

    const hitPlayer =
      item.x > playerPad.x && item.x < playerPad.x + playerPad.width &&
      item.y > playerPad.y && item.y < playerPad.y + playerPad.height;

    if (hitPlayer) {
      if (item.type === "speed") {
        speedMultiplier = Math.min(2.8, speedMultiplier + 0.6);
        messageElement.textContent = "Power-up de velocidade!";
      }
      if (item.type === "wide") {
        playerPad.width = Math.min(220, playerPad.width + 24);
        messageElement.textContent = "Raquete aumentada!";
      }
      if (item.type === "shield") {
        playerShield = 5;
        messageElement.textContent = "Escudo ativo!";
      }
      powerUps.splice(i, 1);
      continue;
    }

    if (item.y > canvas.height + 30) {
      powerUps.splice(i, 1);
    }
  }

  if (ballPause <= 0) {
    ball.x += ball.vx * delta * speedMultiplier;
    ball.y += ball.vy * delta * speedMultiplier;
  }

  if (ball.x <= 10 || ball.x >= canvas.width - 10) {
    ball.vx *= -1;
    ball.x = Math.max(10, Math.min(canvas.width - 10, ball.x));
  }

  if (
    ball.y + ball.radius >= playerPad.y &&
    ball.y - ball.radius <= playerPad.y + playerPad.height &&
    ball.x >= playerPad.x &&
    ball.x <= playerPad.x + playerPad.width &&
    ball.vy > 0
  ) {
    ball.vy *= -1.05;
    ball.y = playerPad.y - ball.radius;
    ball.vx += (ball.x - (playerPad.x + playerPad.width / 2)) * 0.06;
    speedMultiplier = Math.min(2.4, speedMultiplier + 0.07);
    messageElement.textContent = "Devolveu!";
  }

  if (
    ball.y - ball.radius <= cpuPad.y + cpuPad.height &&
    ball.y + ball.radius >= cpuPad.y &&
    ball.x >= cpuPad.x &&
    ball.x <= cpuPad.x + cpuPad.width &&
    ball.vy < 0
  ) {
    ball.vy *= -1.05;
    ball.y = cpuPad.y + cpuPad.height + ball.radius;
    ball.vx += (ball.x - (cpuPad.x + cpuPad.width / 2)) * 0.06;
    speedMultiplier = Math.min(2.4, speedMultiplier + 0.05);
    messageElement.textContent = "PC devolveu!";
  }

  if (ball.y > canvas.height + 30) {
    if (playerShield > 0) {
      playerShield -= 1;
      ball.vy *= -1;
      ball.y = playerPad.y - ball.radius - 6;
      messageElement.textContent = "Escudo absorveu o ponto!";
    } else {
      cpuScore += 1;
      messageElement.textContent = "Ponto para o PC!";
      resetBall("cpu");
    }
  }

  if (ball.y < -30) {
    playerScore += 1;
    const nextLevel = Math.min(4, Math.floor(playerScore / 2) + 1);
    if (nextLevel > level) {
      level = nextLevel;
      messageElement.textContent = `FASE ${level}! O PC ficou mais rápido.`;
    } else {
      messageElement.textContent = "Ponto para você!";
    }
    resetBall("player");
  }

  if (playerScore >= 7 || cpuScore >= 7) {
    world.state = "gameover";
    const winner = playerScore > cpuScore ? "Você venceu!" : "O PC venceu!";
    messageElement.textContent = `${winner} Clique em JOGAR para repetir.`;
  }

  updateHud();
}

function resetBall(winner) {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  const dir = winner === "player" ? 1 : -1;
  const levelSpeed = 1 + (level - 1) * 0.18;
  nextBallVelocity = {
    vx: (Math.random() * 2.5 + 3.2) * dir * levelSpeed,
    vy: (Math.random() * 2.5 + 3.5) * (Math.random() > 0.5 ? 1 : -1) * levelSpeed,
  };
  ball.vx = 0;
  ball.vy = 0;
  ballPause = 0.8;
  speedMultiplier = 1;
}

function drawCourt() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 3;
  ctx.setLineDash([14, 14]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(0, 0, canvas.width, 40);
  ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
}

function drawPad(pad, color) {
  ctx.fillStyle = color;
  ctx.fillRect(pad.x, pad.y, pad.width, pad.height);
}

function drawBall() {
  const ballSpeed = Math.hypot(ball.vx, ball.vy) * speedMultiplier;
  const heat = Math.max(0, Math.min(1, (ballSpeed - 5) / 9));
  const hue = 55 - heat * 55;
  const glowSize = 4 + heat * 12;

  ctx.save();
  ctx.shadowColor = heat > 0 ? `hsl(${hue}, 90%, 58%)` : "rgba(248, 250, 252, 0.45)";
  ctx.shadowBlur = glowSize;

  ctx.beginPath();
  ctx.fillStyle = heat === 0 ? "#f8fafc" : `hsl(${hue}, 85%, ${76 - heat * 18}%)`;
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawPowerUps() {
  for (const item of powerUps) {
    if (item.type === "speed") {
      ctx.fillStyle = "#fbbf24";
    } else if (item.type === "wide") {
      ctx.fillStyle = "#34d399";
    } else {
      ctx.fillStyle = "#a78bfa";
    }

    ctx.beginPath();
    ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(item.type === "speed" ? "S" : item.type === "wide" ? "W" : "E", item.x, item.y + 4);
  }
}

function drawShield() {
  if (playerShield <= 0) return;

  ctx.strokeStyle = "rgba(167, 139, 250, 0.9)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(playerPad.x + playerPad.width / 2, playerPad.y + playerPad.height / 2, 38, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(167, 139, 250, 0.22)";
  ctx.fill();
}

function drawDashTrail() {
  if (dashTimer <= 0) return;

  const progress = Math.max(0, Math.min(1, dashTimer / 0.2));
  const centerX = playerPad.x + playerPad.width / 2;
  const centerY = playerPad.y + playerPad.height / 2;
  const pulse = Math.sin(performance.now() / 35) * 0.5 + 0.5;

  ctx.save();
  ctx.globalAlpha = 0.18 + progress * 0.3;
  ctx.fillStyle = "#fef08a";
  ctx.shadowColor = "#facc15";
  ctx.shadowBlur = 24 + pulse * 12;
  ctx.fillRect(playerPad.x - 14, playerPad.y - 10, playerPad.width + 28, playerPad.height + 20);
  ctx.shadowBlur = 0;

  ctx.strokeStyle = `rgba(254, 240, 138, ${0.35 + progress * 0.55})`;
  ctx.lineWidth = 3;
  for (let index = 0; index < 5; index += 1) {
    const offset = 18 + index * 12 + pulse * 5;
    ctx.beginPath();
    ctx.moveTo(centerX - playerPad.width / 2 - offset, centerY - 7 + index * 3);
    ctx.lineTo(centerX - playerPad.width / 2 - offset - 26, centerY - 7 + index * 3);
    ctx.stroke();
  }

  ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + progress * 0.5})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, playerPad.width * (0.5 + (1 - progress) * 0.35), 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawCpuDashTrail() {
  if (cpuDashTimer <= 0) return;

  ctx.fillStyle = "rgba(125, 211, 252, 0.35)";
  ctx.fillRect(cpuPad.x - 10, cpuPad.y - 6, cpuPad.width + 20, cpuPad.height + 12);
}

function drawStaminaNearPad() {
  const barWidth = Math.max(90, playerPad.width - 20);
  const barHeight = 8;
  const barX = playerPad.x + (playerPad.width - barWidth) / 2;
  const animationTime = performance.now();
  const pulse = (Math.sin(animationTime / 140) + 1) / 2;
  const bob = Math.sin(animationTime / 220) * 1.5;
  const barY = playerPad.y - 25 + bob;
  const staminaPercent = Math.max(0, Math.min(100, stamina)) / 100;
  const isCooldown = dashCooldown > 0.35;
  const isActive = dashTimer > 0;

  ctx.save();
  ctx.globalAlpha = 0.82 + pulse * 0.18;
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.fillRect(barX, barY, barWidth, barHeight);
  ctx.fillStyle = isActive ? "#fef08a" : isCooldown ? "#38bdf8" : staminaPercent < 0.35 ? "#f97316" : "#84cc16";
  ctx.shadowColor = ctx.fillStyle;
  ctx.shadowBlur = isActive ? 16 + pulse * 8 : 8 + pulse * 5;
  ctx.fillRect(barX, barY, barWidth * staminaPercent, barHeight);
  ctx.shadowBlur = 0;
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.55 + pulse * 0.35})`;
  ctx.lineWidth = 1;
  ctx.strokeRect(barX, barY, barWidth, barHeight);
  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 10px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${Math.round(stamina)}%`, playerPad.x + playerPad.width / 2, barY - 5);
  ctx.restore();
}

function draw() {
  drawCourt();
  drawPowerUps();
  drawDashTrail();
  drawCpuDashTrail();
  drawPad(playerPad, "#facc15");
  drawStaminaNearPad();
  drawPad(cpuPad, "#7dd3fc");
  drawShield();
  drawBall();

  if (world.state === "gameover") {
    ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f8fafc";
    ctx.textAlign = "center";
    ctx.font = "bold 36px Arial";
    ctx.fillText(playerScore > cpuScore ? "VOCÊ VENCEU!" : "PC VENCEU!", canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = "20px Arial";
    ctx.fillText("Clique em JOGAR para continuar", canvas.width / 2, canvas.height / 2 + 26);
  }
}

startButton.addEventListener("click", startGame);

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["a", "d", "w", "s", "arrowleft", "arrowright", "arrowup", "arrowdown", " "].includes(key) || event.key === " ") {
    event.preventDefault();
  }
  keys[key] = true;
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  keys[key] = false;
});

resetGame();
draw();
