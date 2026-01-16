// WATER RIPPLE BACKGROUND
const canvas = document.getElementById('waterCanvas');
const ctx = canvas.getContext('2d');

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

let ripples = [];

class Ripple {
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.r=0;
    this.a=0.12;
  }
  update(){
    this.r+=1.4;
    this.a-=0.002;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.strokeStyle=`rgba(0,100,120,${this.a})`;
    ctx.stroke();
  }
}

addEventListener('mousemove',e=>{
  ripples.push(new Ripple(e.clientX,e.clientY));
});

function animate(){
  ctx.clearRect(0,0,w,h);
  ripples.forEach((r,i)=>{
    r.update();
    r.draw();
    if(r.a<=0) ripples.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();

addEventListener('resize',()=>{
  w=canvas.width=innerWidth;
  h=canvas.height=innerHeight;
});

// REVEAL
document.addEventListener('scroll',()=>{
  document.querySelectorAll('.reveal').forEach(el=>{
    if(el.getBoundingClientRect().top < innerHeight*0.85){
      el.classList.add('active');
    }
  });
});

// EMAIL COPY
function copyEmail(){
  navigator.clipboard.writeText('e450media@gmail.com');
  const m=document.getElementById('copyMsg');
  m.style.opacity=1;
  setTimeout(()=>m.style.opacity=0,1500);
}

// HAMBURGER
document.getElementById('hamburger').onclick=()=>{
  document.getElementById('navLinks').classList.toggle('open');
};
