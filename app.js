const express = require("express");
const path = require("path");
const sequelize = require("./database");

const publicRoutes = require("./routes/public");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", publicRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

// Criação do canvas
const canvas = document.createElement("canvas");
canvas.id = "particle-canvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffff";

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  updateParticles();
  requestAnimationFrame(drawParticles);
}

function updateParticles() {
  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
}

drawParticles();
