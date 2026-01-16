// WATER RIPPLE – FULL PAGE
const canvas = document.getElementById("waterCanvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

let ripples = [];

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.a = 0.08;
  }
  update() {
    this.r += 1.4;
    this.a -= 0.002;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,0,0,${this.a})`;
    ctx.stroke();
  }
}

function addRipple(x, y) {
  ripples.push(new Ripple(x, y));
}

window.addEventListener("mousemove", e => {
  addRipple(e.clientX, e.clientY);
});

window.addEventListener("touchstart", e => {
  const t = e.touches[0];
  addRipple(t.clientX, t.clientY);
});

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

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// REVEAL + NAV HIGHLIGHT
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 150;

  sections.forEach((sec, i) => {
    if (
      scrollPos >= sec.offsetTop &&
      scrollPos < sec.offsetTop + sec.offsetHeight
    ) {
      navLinks.forEach(l => l.classList.remove("active"));
      navLinks[i]?.classList.add("active");
    }

    if (sec.getBoundingClientRect().top < window.innerHeight * 0.85) {
      sec.classList.add("active");
    }
  });
});

// EMAIL COPY
function copyEmail() {
  navigator.clipboard.writeText("e450media@gmail.com");
  const msg = document.getElementById("copyMsg");
  msg.style.opacity = 1;
  setTimeout(() => msg.style.opacity = 0, 1500);
}

// HAMBURGER
document.getElementById("hamburger").onclick = () => {
  document.getElementById("navLinks").classList.toggle("open");
};
