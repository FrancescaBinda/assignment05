var bird;
var pipes = [];
var mySong;
var analyzer;
var myImg;




function preload() {
  mySong = loadSound('bensound-creepy.mp3');
  myImg = loadImage("ghost-35852_1280.png");

  // Music: https://www.bensound.com





}

function setup() {

  noStroke();
  createCanvas(500, 500)
  mySong.play();
  mySong.loop();
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
  bird = new Bird();
  pipes.push(new Pipe());

}

function draw() {
  background(0);
   textFont('Amatic SC');

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 70 == 0) {
    pipes.push(new Pipe());
  }



}

function keyPressed() {
  if (key == " ") {
    bird.up();
  }
}


function Bird() {
  this.y = height / 2
  this.x = 64;
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  this.show = function() {
    fill(255)
    image(myImg, this.x, this.y, 60, 60)
      //ellipse(this.x, this.y, 20, 20);
  }
  this.up = function() {
    this.velocity += this.lift;
  }
  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.9;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

function Pipe() {
  
  var volume = analyzer.getLevel();
  this.top = random(height / 2);
  this.bottom = random(height / 2);
  this.x = width;
  this.w = 20;
  this.speed = volume * 20;

  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom)
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        mySong.stop();
        return true;


      }

  }


  this.show = function() {

    fill(255);
    if (this.highlight) {
     
      fill("#990202");
      textSize(50);
      textAlign(CENTER);
      text("GAME OVER", width / 2, height / 2);

    }
    rect(this.x, 0, this.w, this.top - 20);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }
  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }

}