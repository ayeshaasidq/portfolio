document.body.classList.add("js");

const hero = document.querySelector(".hero-title");
const projectsBox = document.querySelector(".projects");
const skills = document.querySelector(".skills");
const about = document.querySelector(".about");
const aboutCard = document.querySelector(".about-card");
const buttons = document.querySelector(".buttons");
const projectLinks = document.querySelectorAll(".project-link");

let revealed = false;

function revealLineByLine(){
  if(revealed) return;
  revealed = true;

  const steps = [skills, about, aboutCard, buttons, projectsBox];
  steps.forEach((el, index) => {
    if(!el) return;
    setTimeout(() => {
      el.classList.add("step-visible");
    }, 200 + index * 220);
  });

  projectLinks.forEach((link, index) => {
    setTimeout(() => {
      link.classList.add("reveal");
    }, 1400 + index * 140);
  });
}

if(!hero){
  revealLineByLine();
}else{
  const nameSpan = hero.querySelector("span");
  const greeting = hero.dataset.greeting || "Hi, I'm ";
  const name = hero.dataset.name || "Ayesha Siddiqui";
  const emojis = hero.dataset.emojis || "<br>&#128153;&#9889;";
  
  // Clear initial content
  hero.innerHTML = "";
  
  let step = 0; // 0 = greeting, 1 = name, 2 = emojis
  let charIndex = 0;
  
  function typeGreeting() {
    if(charIndex < greeting.length){
      hero.innerHTML = greeting.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeGreeting, 50);
    }else{
      charIndex = 0;
      step = 1;
      setTimeout(typeName, 200);
    }
  }
  
  function typeName() {
    if(charIndex < name.length){
      hero.innerHTML = `${greeting}<span>${name.slice(0, charIndex + 1)}</span>`;
      charIndex++;
      setTimeout(typeName, 50);
    }else{
      charIndex = 0;
      step = 2;
      setTimeout(typeEmojis, 300);
    }
  }
  
  function typeEmojis() {
    const emojiText = emojis.replace(/<br>/g, '');
    if(charIndex < emojiText.length){
      hero.innerHTML = `${greeting}<span>${name}</span>${emojis.slice(0, charIndex + 1).replace(/<br>/g, '<br>')}`;
      charIndex++;
      setTimeout(typeEmojis, 80);
    }else{
      // Final state - all typed
      hero.innerHTML = `${greeting}<span>${name}</span>${emojis}`;
      // Start revealing other elements
      setTimeout(revealLineByLine, 400);
    }
  }
  
  // Start the typing animation
  typeGreeting();
}
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

let stars = [];

for (let i = 0; i < 400; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.6 + 0.2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    s.y += s.speed;

    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(draw);
}

draw();
