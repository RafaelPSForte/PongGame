class Ball{
    constructor(){
        this.x = 1000/2;
        this.y = 800/2;
        this.xspeed = random(2,5);
        this.yspeed = random(2,5);
        this.diameter = 50;
        this.r = 0;
        this.g = 0;
        this.b = 255;
    }
    move(){
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
    }
    bounce(){
        if (this.x - this.diameter/2 <= 0 || this.x + this.diameter/2>=width){
            this.xspeed = this.xspeed *-1;
            this.changeColor()
        }
        if (this.y - this.diameter/2 <= 0 || this.y + this.diameter/2>=height){
            this.yspeed = this.yspeed *-1;
            this.changeColor();
        }
    }
    show(){
        fill(this.r,this.g,this.b);
        strokeWeight(2);
        stroke(255);
        circle(this.x,this.y,this.diameter);
    }
  
   changeColor(){
        this.r = random(0,255);
        this.g = random(0,255);
        this.b = random(0,255);
   }
   collision(paddle, game){
        this.major = paddle.rectPositionX + paddle.rectLenght;
        let d1 = dist(paddle.rectPositionX,paddle.rectPositionY,this.x, this.y);
        let d2 = dist(this.major,paddle.rectPositionY,this.x, this.y);
        //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
        let dPointLine = abs(0*this.x + this.y*-1 + paddle.rectPositionY);
        if ( dPointLine <= this.diameter/2 && this.x >= paddle.rectPositionX-15 && this.x <= paddle.rectPositionX + paddle.rectLenght+15 ){
          game.score += 1;
          this.yspeed = this.yspeed *-1.05;
          this.changeColor()
          
        }
     }
}
class Game {
  constructor(){
        this.score = 0;
        this.highScore = -1;
        this.drawScore = createP('Score:').position(40,-40).style('font-size: 50px; opacity:0.5; color: #fff');
        this.drawRecord = createP('Record:').position(800,-40).style('font-size: 50px; opacity:0.5; color: #fff');
    }
  reset(ball,paddle){
    if (ball.y >= paddle.rectPositionY){
        ball.y = 100;
        ball.x = 1000/2;
        ball.xspeed = random(2,5);
        ball.yspeed = random(2,5);
        this.score = 0;
      }
  }
  loadRecord(){
    if(this.highScore < this.score){
      this.highScore = this.score;
    }
    this.showScore();
  }
  showScore(){
    this.drawScore.html('Score:' + this.score);
    this.drawRecord.html('Record:' + this.highScore);
  }
}

class Paddle{
    constructor(){
        this.rectHeight = 20;
        this.rectLenght = 100;
        this.rectPositionX = 200;
        this.rectPositionY = 500;
    }
    show(){
        fill(255,0,0);
        noStroke();                   
        rect(this.rectPositionX, this.rectPositionY,this.rectLenght,this.rectHeight);
    }
    move(){
        if(keyIsDown(RIGHT_ARROW)){
            if(this.rectPositionX + this.rectLenght<= width){
                this.rectPositionX += 10;
            }
            
        }
        if(keyIsDown(LEFT_ARROW)){
            if(this.rectPositionX >=0){
                this.rectPositionX -= 10;
            }
            
        }
    } 
}

class Clouds{
  constructor(){
    this.x = -200;
    this.y = 100;
  } 
  show(){
    cloud.resize(200,200);
    image(cloud, this.x,this.y)
  }
  move(){
    this.x += 3;
    if(this.x >= 1000){
      this.x = -500;
    }
  }
}

let ball;
let paddle;
let game;
let number;
let sky;
let cloud;
let clouds;

function preload(){
  sky = loadImage('Images/sky.jpg');
  cloud = loadImage('Images/cloud.png');
}


function setup(){
    createCanvas(1000, 800);
    ball = new Ball();
    paddle = new Paddle();
    game = new Game();
    clouds = new Clouds();
}

function draw(){
    background(sky);
    ball.show();
    clouds.show();
    clouds.move()
    ball.move();
    ball.bounce();
    ball.collision(paddle,game);
    game.reset(ball,paddle);
    game.loadRecord();
    paddle.show();
    paddle.move();
    
}