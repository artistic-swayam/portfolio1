const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

let engine;
let world;
let words = [];
let ground, wallLeft, wallRight;
let mouseConstraint;
let hasStarted = false; // trigger only once

let wordsArray = [
  "💻 Creative Websites",
  "🎞️ Modern Animations",
  "⚡ Fast Development",
  "📱 Mobile-Optimized",
  "🧰 Build with Precision",
  "💰 Transparent Pricing",
  "☁️ Hosting & Support",
  "🛒 E-Commerce Ready",
  "🧠 UX-Focused Design",
  "⚡Performance Optimized"
];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("contacts");
  cnv.id("bgCanvas");

  engine = Engine.create();
  world = engine.world;

  ground = Bodies.rectangle(width / 2, height - 20, width, 10, { isStatic: true });
  wallLeft = Bodies.rectangle(0, height / 2, 10, height, { isStatic: true });
  wallRight = Bodies.rectangle(width, height / 2, 10, height, { isStatic: true });

  World.add(world, [ground, wallLeft, wallRight]);

  // Mouse drag
  const canvasMouse = Mouse.create(cnv.elt);
  canvasMouse.pixelRatio = pixelDensity();
  const options = {
    mouse: canvasMouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  };
  mouseConstraint = MouseConstraint.create(engine, options);
  World.add(world, mouseConstraint);

  noLoop(); // don't draw until triggered
}

function draw() {
  clear();
  Engine.update(engine);

  for (let word of words) {
    word.show();
  }

  if (mouseConstraint.body) {
    fill(255, 0, 0, 100);
    noStroke();
    ellipse(mouseConstraint.mouse.position.x, mouseConstraint.mouse.position.y, 40);
  }
}

// Responsive + styled words
class Word {
  constructor(x, y, word) {
    this.word = word;
    this.textSize = windowWidth < 600 ? 20 : 32;
  
    textFont('SF Pro Display');
    textSize(this.textSize);
    this.width = textWidth(this.word) + 30; // Less padding
    this.height = 50;
  
    this.body = Bodies.rectangle(x, y, this.width, this.height);
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);

    fill("#13131b");
    stroke("#c17605");
    strokeWeight(1);
    rect(0, 0, this.width, this.height, 60);

    noStroke();
    textFont('SF Pro Display');
    textAlign(CENTER, CENTER);
    fill("rgb(224, 222, 222)");
    textSize(this.textSize);
    text(this.word, 0, 0);
    pop();
  }
}

// Force apply on hover
function mouseMoved() {
  for (let word of words) {
    if (dist(mouseX, mouseY, word.body.position.x, word.body.position.y) < 50) {
      Body.applyForce(
        word.body,
        { x: word.body.position.x, y: word.body.position.y },
        { x: random(-1, 1), y: random(-1, 1) }
      );
    }
  }
}

// Intersection trigger for contact section
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasStarted) {
      hasStarted = true;

      for (let i = 0; i < wordsArray.length; i++) {
        words.push(new Word(random(width), -200, wordsArray[i]));
      }

      loop(); // now start drawing
    }
  });
}, { threshold: 0.5 });

observer.observe(document.querySelector(".contacts"));

// Optional: rebuild on resize
function windowResized() {
  location.reload(); // Or reinitialize manually
}
