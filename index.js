const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = randomColor();
    this.opacity = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
    else this.opacity -= 0.02;

    if (this.opacity <= 0) this.opacity = 0.5;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  static drawConnection(p1, p2) {
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    if (dist < 100) {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 100})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }
}

function randomColor() {
  return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }, 0.7)`;
}

function createParticles(x, y, count = 5) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y));
  }
}

canvas.addEventListener("mousemove", (e) => createParticles(e.x, e.y));
canvas.addEventListener("click", (e) => createParticles(e.x, e.y, 40));

document.getElementById("colorBtn").addEventListener("click", () => {
  particles.forEach((p) => (p.color = randomColor()));
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function animate() {
  // 🔥 Trail Effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i + 1; j < particles.length; j++) {
      Particle.drawConnection(particles[i], particles[j]);
    }

    if (particles[i].size <= 0.2) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();
