const canvas = document.getElementById("rippleCanvas");
const ctx = canvas.getContext("2d");
const glow = document.getElementById("cursorGlow");
const hoverTargets = document.querySelectorAll(".hover-target");
const gradient = document.querySelector(".gradient");

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

let ripples = [];
let lastX = 0;
let lastY = 0;
let speed = 0;
let isDark = false;

/* ===== RIPPLE ===== */
class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.a = 0.08;
  }
  update() {
    this.r += 1.3;
    this.a -= 0.0016;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    const color = isDark ? "255,255,255" : "0,0,0";
    ctx.strokeStyle = `rgba(${color},${this.a})`;
    ctx.stroke();
  }
}

/* ===== MOUSE MOVE ===== */
addEventListener("mousemove", e => {
  const x = e.clientX;
  const y = e.clientY;

  speed = Math.hypot(x - lastX, y - lastY);
  lastX = x;
  lastY = y;

  const glowSize = Math.min(220 + speed * 4, 420);
  glow.style.width = glowSize + "px";
  glow.style.height = glowSize + "px";
  glow.style.opacity = Math.min(0.12 + speed * 0.003, 0.25);

  glow.style.left = x + "px";
  glow.style.top = y + "px";

  ripples.push(new Ripple(x, y));
});

/* ===== TEXT HOVER ===== */
hoverTargets.forEach(el => {
  el.addEventListener("mouseenter", () => {
    glow.style.width = "480px";
    glow.style.height = "480px";
  });
  el.addEventListener("mouseleave", () => {
    glow.style.width = "220px";
    glow.style.height = "220px";
  });
});

/* ===== ANIMATION LOOP ===== */
function animate() {
  ctx.clearRect(0, 0, w, h);

  ripples.forEach((r, i) => {
    r.update();
    r.draw();
    if (r.a <= 0) ripples.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

/* ===== RESIZE ===== */
addEventListener("resize", () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
});

/* ===== DARK MODE ===== */
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  isDark = document.body.classList.contains("dark");
};
