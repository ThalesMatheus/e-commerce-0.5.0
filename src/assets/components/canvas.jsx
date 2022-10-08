import { useEffect } from "react";

function Cancan() { 
  useEffect(() => {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;

  class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.accelX = 0;
    this.accelY = 0;
    this.life = 2000;
    this.alpha = 1;
    this.size = 2;
  }

  update() {
    this.vx += this.accelX;
    this.vy += this.accelY;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(34, 162, 238, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
  }

  isAlive() {
    return this.life >= 0;
  }
  }

  class ParticleSystem {
  constructor() {
    this.particles = [];
    this.updateHandler = undefined;
  }

  addParticle(particle) {
    this.particles.push(particle);
  }

  update(deltaTime = 0) {
    this.particles.forEach(particle => {
      particle.update(deltaTime);
      this.updateHandler && this.updateHandler(particle);
    });
  }

  onUpdate(fn) {
    this.updateHandler = fn;
  }
  }
  
  let system = new ParticleSystem();

  for (let i = 0; i < 350; i++) {
  let particle = new Particle();
  let angle = Math.PI/2 * (Math.random() - 0.5) * 2;
  particle.x = Math.random() * width;
  particle.y = Math.random() * height;
  particle.life = Math.random() * 1000 + 1000;
  particle.size = Math.random() * 1.5;  
  particle.maxLife = particle.life;
  system.addParticle(particle);
  }

  system.onUpdate((particle) => {
  if (!particle.isAlive()) {
    particle.x = Math.random() * width;
    particle.y = Math.random() * height;
    particle.vx = 0;
    particle.vy = 0;
    particle.life = Math.random() * 1000 + 1000;
    particle.maxLife = particle.life;    
  }

  particle.life -= 10;
  particle.accelX = (Math.random() - 0.5) * 0.02;
  particle.accelY = (Math.random() - 0.5) * 0.02;

  if (particle.life >= particle.maxLife / 2) {
    particle.alpha = 1 - (particle.life / particle.maxLife);
  } else {
    particle.alpha = particle.life / particle.maxLife;
  }
  particle.update();
  });

  function update() {
  system.update();
  }

  function draw() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#010101';
  ctx.fillRect(0, 0, width, height);

  let grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height/2, width);
  grad.addColorStop(0, '#6862e1');
  grad.addColorStop(0.75, 'transparent');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = '#3d2176';

  system.particles.forEach(particle => particle.draw(ctx));
  }

  function render() {
  update();
  draw();
  requestAnimationFrame(render);
  }

  function setup() {
  canvas.width = width;
  canvas.height = height;
  }

  function init() {
  setup();
  render();
  }

  init();
}, []);
return (
  <canvas id="canvas" className="eba"></canvas>
)
}

export default Cancan;

// window.onload = function() {
//   setTimeout(start, 200);
// };

// function start() {

//   //Helpers
//   function lineToAngle(x1, y1, length, radians) {
//       var x2 = x1 + length * Math.cos(radians),
//           y2 = y1 + length * Math.sin(radians);
//       return { x: x2, y: y2 };
//   }

//   function randomRange(min, max) {
//       return min + Math.random() * (max - min);
//   }

//   function degreesToRads(degrees) {
//       return degrees / 180 * Math.PI;
//   }

//   //Particle
//   var particle = {
//       x: 0,
//       y: 0,
//       vx: 0,
//       vy: 0,
//       radius: 0,

//       create: function(x, y, speed, direction) {
//           var obj = Object.create(this);
//           obj.x = x;
//           obj.y = y;
//           obj.vx = Math.cos(direction) * speed;
//           obj.vy = Math.sin(direction) * speed;
//           return obj;
//       },

//       getSpeed: function() {
//           return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
//       },

//       setSpeed: function(speed) {
//           var heading = this.getHeading();
//           this.vx = Math.cos(heading) * speed;
//           this.vy = Math.sin(heading) * speed;
//       },

//       getHeading: function() {
//           return Math.atan2(this.vy, this.vx);
//       },

//       setHeading: function(heading) {
//           var speed = this.getSpeed();
//           this.vx = Math.cos(heading) * speed;
//           this.vy = Math.sin(heading) * speed;
//       },

//       update: function() {
//           this.x += this.vx;
//           this.y += this.vy;
//       }
//   };

//   //Canvas and settings
//   var canvas = document.getElementById("canvas"),
//       context = canvas.getContext("2d"),
//       width = canvas.width = window.innerWidth,
//       height = canvas.height = window.innerHeight,
//       stars = [],
//       shootingStars = [],
//       layers = [
//           { speed: 0.015, scale: 0.2, count: 320 },
//           { speed: 0.03, scale: 0.5, count: 50 },
//           { speed: 0.05, scale: 0.75, count: 30 }
//       ],
//       starsAngle = 145,
//       shootingStarSpeed = {
//           min: 15,
//           max: 20
//       },
//       shootingStarOpacityDelta = 0.01,
//       trailLengthDelta = 0.01,
//       shootingStarEmittingInterval = 2000,
//       shootingStarLifeTime = 500,
//       maxTrailLength = 300,
//       starBaseRadius = 2,
//       shootingStarRadius = 3,
//       paused = false;

//   //Create all stars
//   for (var j = 0; j < layers.length; j += 1) {
//       var layer = layers[j];
//       for (var i = 0; i < layer.count; i += 1) {
//           var star = particle.create(randomRange(0, width), randomRange(0, height), 0, 0);
//           star.radius = starBaseRadius * layer.scale;
//           star.setSpeed(layer.speed);
//           star.setHeading(degreesToRads(starsAngle));
//           stars.push(star);
//       }
//   }

//   function createShootingStar() {
//       var shootingStar = particle.create(randomRange(width / 2, width), randomRange(0, height / 2), 0, 0);
//       shootingStar.setSpeed(randomRange(shootingStarSpeed.min, shootingStarSpeed.max));
//       shootingStar.setHeading(degreesToRads(starsAngle));
//       shootingStar.radius = shootingStarRadius;
//       shootingStar.opacity = 0;
//       shootingStar.trailLengthDelta = 0;
//       shootingStar.isSpawning = true;
//       shootingStar.isDying = false;
//       shootingStars.push(shootingStar);
//   }

//   function killShootingStar(shootingStar) {
//       setTimeout(function() {
//           shootingStar.isDying = true;
//       }, shootingStarLifeTime);
//   }

//   function update() {
//       if (!paused) {
//           context.clearRect(0, 0, width, height);
//           context.fillStyle = "#282a3a";
//           context.fillRect(0, 0, width, height);
//           context.fill();

//           for (var i = 0; i < stars.length; i += 1) {
//               var star = stars[i];
//               star.update();
//               drawStar(star);
//               if (star.x > width) {
//                   star.x = 0;
//               }
//               if (star.x < 0) {
//                   star.x = width;
//               }
//               if (star.y > height) {
//                   star.y = 0;
//               }
//               if (star.y < 0) {
//                   star.y = height;
//               }
//           }

//           for (i = 0; i < shootingStars.length; i += 1) {
//               var shootingStar = shootingStars[i];
//               if (shootingStar.isSpawning) {
//                   shootingStar.opacity += shootingStarOpacityDelta;
//                   if (shootingStar.opacity >= 1.0) {
//                       shootingStar.isSpawning = false;
//                       killShootingStar(shootingStar);
//                   }
//               }
//               if (shootingStar.isDying) {
//                   shootingStar.opacity -= shootingStarOpacityDelta;
//                   if (shootingStar.opacity <= 0.0) {
//                       shootingStar.isDying = false;
//                       shootingStar.isDead = true;
//                   }
//               }
//               shootingStar.trailLengthDelta += trailLengthDelta;

//               shootingStar.update();
//               if (shootingStar.opacity > 0.0) {
//                   drawShootingStar(shootingStar);
//               }
//           }

//           //Delete dead shooting shootingStars
//           for (i = shootingStars.length -1; i >= 0 ; i--){
//               if (shootingStars[i].isDead){
//                   shootingStars.splice(i, 1);
//               }
//           }
//       }
//       requestAnimationFrame(update);
//   }

//   function drawStar(star) {
//       context.fillStyle = "rgb(255, 221, 157)";
//       context.beginPath();
//       context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
//       context.fill();
//   }

//   function drawShootingStar(p) {
//       var x = p.x,
//           y = p.y,
//           currentTrailLength = (maxTrailLength * p.trailLengthDelta),
//           pos = lineToAngle(x, y, -currentTrailLength, p.getHeading());

//       context.fillStyle = "rgba(255, 255, 255, " + p.opacity + ")";
//       // context.beginPath();
//       // context.arc(x, y, p.radius, 0, Math.PI * 2, false);
//       // context.fill();
//       var starLength = 5;
//       context.beginPath();
//       context.moveTo(x - 1, y + 1);

//       context.lineTo(x, y + starLength);
//       context.lineTo(x + 1, y + 1);

//       context.lineTo(x + starLength, y);
//       context.lineTo(x + 1, y - 1);

//       context.lineTo(x, y + 1);
//       context.lineTo(x, y - starLength);

//       context.lineTo(x - 1, y - 1);
//       context.lineTo(x - starLength, y);

//       context.lineTo(x - 1, y + 1);
//       context.lineTo(x - starLength, y);

//       context.closePath();
//       context.fill();

//       //trail
//       context.fillStyle = "rgba(255, 221, 157, " + p.opacity + ")";
//       context.beginPath();
//       context.moveTo(x - 1, y - 1);
//       context.lineTo(pos.x, pos.y);
//       context.lineTo(x + 1, y + 1);
//       context.closePath();
//       context.fill();
//   }

//   //Run
//   update();

//   //Shooting stars
//   setInterval(function() {
//       if (paused) return;
//       createShootingStar();
//   }, shootingStarEmittingInterval);

//   window.onfocus = function () {
//     paused = false;
//   };

//   window.onblur = function () {
//     paused = true;
//   };

// }
//up and down arrows change connection lengths
//right and left will restart with more/less points
//space will restart 
// let pArray = [];
// let n
// let d = 2;
// let inc = 0.5;
// let limit
// let nMarker = 2;
// let dMarker = 0;
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   translate(width / 2, height / 2);
//   background(0);
//   n = nMarker * 300 + 300;
//   limit = dMarker * 10 + 20;
//   pointArray();
//   fill(255);
//   stroke(255);

// }

// function draw() {
//   translate(width / 2, height / 2);
//   createButtons();
//   if (d < limit) {
//     for (let i = 0; i < n; i++) {
//       for (let j = 0; j < n; j++) {
//         distance = dist(pArray[i][0], pArray[i][1], pArray[j][0], pArray[j][1]);
//         if (i != j && distance <= d && distance > d - inc) {
//           line(pArray[i][0], pArray[i][1], pArray[j][0], pArray[j][1]);
//         }
//       }
//     }
//     d += inc;
//   }
// }

// function pointArray() {
//   fill(255);
//   noStroke();
//   for (let i = 0; i < n; i++) {
//     a = random(-width / 2, width / 2);
//     b = random(-width / 2, width / 2);
//     pArray[i] = [a, b];
//     circle(pArray[i][0], pArray[i][1], 1);
//   }
// }

// function mousePressed() {}

// function createButtons() {
//   strokeWeight(1);
//   for (let i = 0; i < 10; i++) {
//     if (nMarker === i) {
//       fill(255, 255, 255, 100);
//     } else {
//       fill(0);
//     }
//     circle(-width / 2 + 50 + i * 15, -height / 2 + 10, 10);
//     if (dMarker === i) {
//       fill(255, 255, 255, 100);
//     } else {
//       fill(0);
//     }
//     circle(-width / 2 + 20, -height / 2 + 50 + i * 15, 10);
//   }
//   strokeWeight(0.05);
// }

// function keyPressed() {
//   if (keyCode === 39) {
//     if (nMarker < 9) {
//       nMarker++;
//       n = nMarker * 300 + 300;
//       resketch();
//     } else {
//       nMarker = 0;
//       n = nMarker * 300 + 300;
//       resketch();
//     }
//   } else if (keyCode === 37) {
//     if (nMarker > 0) {
//       nMarker--;
//       n = nMarker * 300 + 300;
//       resketch();
//     } else {
//       nMarker = 9;
//       n = nMarker * 300 + 300;
//       resketch();
//     }
//   } else if (keyCode === 40) {
//     if (dMarker < 9) {
//       dMarker++;
//     } else {
//       dMarker = 0;
//     }
//   } else if (keyCode === 38) {
//     if (dMarker > 0) {
//       dMarker--;
//     } else {
//       dMarker = 9;
//     }
//   } else if (keyCode === 32) {
//     resketch();
//   }
//   limit = dMarker * 20 + 20;
// }
// function resketch() {
//   d = 2;
//   pArray = [];
//   background(0);
//   pointArray();
//   stroke(255);
// }
