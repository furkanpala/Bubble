class Bubble {
  constructor(_x, _y, _r) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.speed = createVector(random(-1, 1), random(-1, 1));
    this.clr = color(random(150,257),random(150,257),random(150,257));
  }
  
  colorChange() {
    this.clr = color(random(150,257),random(150,257),random(150,257));
  }
  show() {
    noFill();
    strokeWeight(2);
    stroke(this.clr);
    circle(this.x, this.y, 2 * this.r);
  }
  move() {
    if ((this.x + this.r) >= width) {
      this.speed.x *= -1;
      this.x = width - this.r;
      this.colorChange();
    } else if ((this.x - this.r) <= 0) {
      this.speed.x *= -1;
      this.x = this.r;
      this.colorChange();
    }
    if (((this.y + this.r) >= height)) {
      this.speed.y *= -1;
      this.y = height - this.r;
      this.colorChange();
    } else if ((this.y - this.r) <= 0) {
      this.speed.y *= -1;
      this.y = this.r;
      this.colorChange();
    }
    this.x += this.speed.x
    this.y += this.speed.y;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d <= this.r + other.r) {
      let newSpeed = createVector(other.x - this.x, other.y - this.y);
      this.speed = this.speed.rotate(PI - this.speed.angleBetween(newSpeed));
      other.speed = other.speed.rotate(other.speed.angleBetween(newSpeed));
      return true;
    }
    else {
      return false;
    }
  }
  
  bubbleClicked()
  {
   if(dist(mouseX,mouseY,this.x,this.y) < this.r)
   {
      return true; 
   }
    else{
      return false;
    }
  }
}
let bubbles = new Array();

function setup() {
  createCanvas(1500, 700);
  for (let i = 0; i < 50; i++) {
    bubbles.push(new Bubble(random(width), random(height), 20));
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    for (let j = 0; i != j && j < bubbles.length; j++) {
      if(bubbles[i].intersects(bubbles[j]))
      {
        bubbles[j].colorChange();
        bubbles[i].colorChange();
      }
    }
  }
}

function mousePressed()
{
  for(let i = bubbles.length - 1; i >= 0; i--)
      {
        if(bubbles[i].bubbleClicked() && bubbles[i].r >= 4)
           {
              let x = bubbles[i].x;
              let y = bubbles[i].y;
              let r = bubbles[i].r;
              bubbles.splice(i,1);
             for(let j = 0; j < 2; j++)
             {
              let smallBubble = new Bubble(x + random(r),y + random(r),r / 2);
              bubbles.push(smallBubble);
             }
           }
      }
}
