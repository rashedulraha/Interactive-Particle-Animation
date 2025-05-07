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
    this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    }, 0.7)`;
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
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Check if the particle is close enough to draw a connection line
  static drawConnection(particle1, particle2) {
    const dist = Math.hypot(
      particle2.x - particle1.x,
      particle2.y - particle1.y
    );
    if (dist < 100) {
      ctx.beginPath();
      ctx.moveTo(particle1.x, particle1.y);
      ctx.lineTo(particle2.x, particle2.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }
}

function createParticles(e) {
  const xPos = e.x;
  const yPos = e.y;
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(xPos, yPos));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw particles and connections
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Draw connections between particles
    for (let j = i + 1; j < particles.length; j++) {
      Particle.drawConnection(particles[i], particles[j]);
    }

    if (particles[i].size <= 0.2) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animateParticles);
}

canvas.addEventListener("mousemove", createParticles);
animateParticles();
