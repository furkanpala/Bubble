class Bubble {
    constructor(_x, _y, _r) {
      this.x = _x;
      this.y = _y;
      this.r = _r;
      this.speed = createVector(random(-1, 1), random(-1, 1));
      this.rC = random(150, 257);
      this.gC = random(150, 257);
      this.bC = random(150, 257);
    }
  
    show() {
      noFill();
      strokeWeight(2);
      stroke(this.rC, this.gC, this.bC);
      circle(this.x, this.y, 2 * this.r);
    }
  
  
    colorChange() {
      this.rC = random(150, 257);
      this.gC = random(150, 257);
      this.bC = random(150, 257);
    }
    move() {
      if ((this.x + this.r) >= width) {
        this.speed.x *= -1;
        this.x = width - this.r;
        this.rC = random(150, 257);
        this.gC = random(150, 257);
        this.bC = random(150, 257);
      } else if ((this.x - this.r) <= 0) {
        this.speed.x *= -1;
        this.x = this.r;
        this.rC = random(150, 257);
        this.gC = random(150, 257);
        this.bC = random(150, 257);
      }
      if (((this.y + this.r) >= height)) {
        this.speed.y *= -1;
        this.y = height - this.r;
        this.rC = random(150, 257);
        this.gC = random(150, 257);
        this.bC = random(150, 257);
      } else if ((this.y - this.r) <= 0) {
        this.speed.y *= -1;
        this.y = this.r;
        this.rC = random(257);
        this.gC = random(257);
        this.bC = random(257);
      }
      this.x += this.speed.x
      this.y += this.speed.y;
    }
  
    intersects(other) {
      let d = dist(this.x, this.y, other.x, other.y);
      if (d <= this.r + other.r) {
        this.rC = random(150, 257);
        this.gC = random(150, 257);
        this.bC = random(150, 257);
        let newSpeed = createVector(other.x - this.x, other.y - this.y);
        this.speed = this.speed.rotate(PI - this.speed.angleBetween(newSpeed));
        other.speed = other.speed.rotate(other.speed.angleBetween(newSpeed));
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
    createCanvas(windowWidth, windowHeight);
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
        bubbles[i].intersects(bubbles[j]);
      }
    }
  }
  
  function mousePressed()
  {
    for(let i = bubbles.length - 1; i >=0; i--)
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

  function windowResized()
{
    resizeCanvas(windowWidth,windowHeight);
}
