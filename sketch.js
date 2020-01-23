let w, h;

let rows, cols;
const scale = 40;
let terrain = [];

// Controls
let xspeed = 0;
let yspeed = 0;
let lookHorizontal = 0;
let lookVertical = 70;

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h, WEBGL);

  rows = 2 * h / scale;
  cols = w / scale;

  terrain = [
    [cols],
    [rows]
  ];
}

function draw() {
  // --- Terrain generation --- //
  xoff = xspeed;
  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    yoff = yspeed;
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -75, 75);
      yoff += 0.2;
    }
    xoff += 0.2;
  }

  background(30);

  strokeWeight(2);
  stroke(255, 50);
  noFill();

  // --- Camera --- //
  rotateX(radians(76));
  rotateZ(radians(-lookHorizontal));
  translate(-w / 2, -h * 1.2, 10);

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scale, y * scale, terrain[x][y]);
      vertex(x * scale, (y + 1) * scale, terrain[x][y + 1]);
    }
    endShape();
  }


  // --- Controls --- //
  // Look up and down
  if (mouseIsPressed) {
    lookHorizontal = map(pwinMouseX, -windowWidth / 2, windowWidth / 2, 180, -180);
    lookVertical = map(pwinMouseY, -windowHeight / 2, windowHeight / 2, 90, 50);
  }
  // strafe left and right
  if (keyIsDown(37) || keyIsDown(65)) {
    xspeed -= 0.1;
  } else if (keyIsDown(39) || keyIsDown(68)) {
    xspeed += 0.1;
  }

  // forward and backward
  if (keyIsDown(38) || keyIsDown(87)) {
    yspeed -= 0.1;
  } else if (keyIsDown(40) || keyIsDown(83)) {
    yspeed += 0.1;
  }
}
