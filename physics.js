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

  let wordsArray = [
      "Github",
      "Instagram",
      "Threads",
      "LinkedIn",
      "Call",
  ];

  function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
cnv.parent("contacts");
cnv.id("bgCanvas"); // optional if you want to style via CSS

// Make sure this is visible in contacts section
console.log("Canvas created:", width, height);
      engine = Engine.create();
      world = engine.world;

      ground = Bodies.rectangle(width / 2, height - 20, width, 10, { isStatic: true });
      wallLeft = Bodies.rectangle(0, height / 2, 10, height, { isStatic: true });
      wallRight = Bodies.rectangle(width, height / 2, 10, height, { isStatic: true });

      World.add(world, [ground, wallLeft, wallRight]);

      for (let i = 0; i < wordsArray.length; i++) {
          words.push(new Word(random(width), -200, wordsArray[i]));
      }

      // Enable mouse dragging
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
  }

  function draw() {
    background("#f0f0f0"); // or use a color that matches your brand

      Engine.update(engine);

      for (let word of words) {
          word.show();
      }

      // Optional: visualize dragging circle
      if (mouseConstraint.body) {
          fill(255, 0, 0, 100);
          noStroke();
          ellipse(mouseConstraint.mouse.position.x, mouseConstraint.mouse.position.y, 40);
      }
  }

  class Word {
      constructor(x, y, word) {
        this.width = word.length * 40 + 80;
this.height = 100;
this.body = Bodies.rectangle(x, y, this.width, this.height);
         
          this.word = word;
          World.add(world, this.body);
      }

      show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        fill(255);
        stroke("#0f0f0f");
        strokeWeight(3);
        rect(0, 0, this.width, this.height, 60);
        noStroke();
        textFont("monospace");
        textAlign(CENTER, CENTER);
        fill("#0f0f0f");
        textSize(40);
        text(this.word.toUpperCase(), 0, 0);
        pop();
    }    
  }

  // Optional: keep hover-based force if you want both
  function mouseMoved() {
      for (let word of words) {
          if (dist(mouseX, mouseY, word.body.position.x, word.body.position.y) < 50) {
              Body.applyForce(
                  word.body,
                  { x: word.body.position.x, y: word.body.position.y },
                  { x: random(-0.2, 0.2), y: random(-0.2, 0.2) }
              );
          }
      }
  }
