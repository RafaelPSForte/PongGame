class Ball {
    constructor(){
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.xspeed = random(1,10);
        this.yspeed = random(1,10);
        this.colorR , this.colorG, this.colorB = 50;
        this.r = 50;
    }
    show(){
        fill(this.colorR, this.colorG,this.colorB);
        noStroke();
        circle(this.x,this.y, this.r*2);
    }
    move(){
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
    }
    bounce(){
        if (this.x > width || this.x <  this.r){
            this.xspeed = this.xspeed * -1;
            this.colorChange();
        }
        if (this.y > height || this.y < this.r){
            this.yspeed = this.yspeed * -1;
            this.colorChange();
         }
    }
    colorChange(){
        this.colorR = random(0,255);
        this.colorG = random(0,255);
        this.colorB = random(0,255);
    }
    clicked(){
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.r){
            this.colorChange();
        }
    }
    intersects(other){
        let distance = dist(this.x,this.y,other.x,other.y)
        if(distance < this.r + other.r){
            return true;
        }
        else{
            return false;
        }
    }
    changeDirection(other){
        this.xspeed = this.xspeed * -1;
        this.yspeed = this.yspeed * -1;
        other.xspeed = other.xspeed * -1;
        other.yspeed = other.yspeed * -1;
    }
}


let ball = [];



function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(255);
    for(var i = 0;i<2;i++){
        ball[i] = new Ball;
    }
    
}

function draw (){
    background(0);
    for(let b of ball){
        let overlapping = false;
        b.show();
        b.move();
        b.bounce(); 
        for (let other of ball){
            if (b!==other && b.intersects(other)){
                overlapping = true;
            }
            if(overlapping){
                b.changeDirection(other);
            }
        }
    
}
}

function mousePressed(){
    for(var i = 0;i<ball.length;i++){
        ball[i].clicked();
    }
}