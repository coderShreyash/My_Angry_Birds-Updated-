const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot,bird1,bird2,bon,heart,heart1,heart2;
var life = 4;
var num = 0;
var hit = 2;
var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var base_1;
function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1530,750);
    engine = Engine.create();
    world = engine.world;
   

    ground = new Ground(1530/2,height,1530,20);
    platform = new Ground(150, 605, 400, 200);
   
    bird = new Bird(250,350);
    bird1 = new Bird1(200,200);
    bird2 = new Bird2(120,200);
    bird3 = new Bird3(30,200);
    bon = bird;
    
    slingshot = new SlingShot(bon.body,{x:250, y:350});
    heart = new Heart(750,85,50,50);
    heart1 = new Heart(820,85,50,50);
    heart2 = new Heart(890,85,50,50);
    heart3 = new Heart(960,85,50,50);
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(55)
        fill("white")
        text("Score :  " + score, width-350, 100)
        text("Life : ",600,100);
        text("Hits Remaining : "+ hit,30,100)
    
    Engine.update(engine);
    //strokeWeight(4);
   
    ground.display();
 
    bird.display();
    bird1.display();
    bird2.display();
    bird3.display();
  

  
    platform.display();
    heart.display();
    heart1.display();
    heart2.display();
    heart3.display();
   
    slingshot.display();    
    if(score>=2201){
        bon = null;
        hit = 0;
        textStyle("bold");
        textSize(100);
        fill(random(0,255),random(0,255),random(0,255))
        text("Birdie !",600,300);
    }
    if(score==0&&life!=0){
        text("Just For Trial !",650,300);
    }
    else if(score<=400&&life!=0){
        text("You Are Good !",540,300);
    }
    else if(score<=800&&life!=0){
        text("Excellent !",580,300);
    }
    else if(score<=1200&&life!=0){
        text("Outstanding !",550,300);
    }
    else if(score<=1400&&life!=0){
        text("Marvellous !",550,300);
    }
   
       
    }


function mouseDragged(){
    if (gameState!=="launched"&&mouseX<400&&mouseX>=0&&mouseY>100&&mouseY<800){
        Matter.Body.setPosition(bon.body, {x: mouseX , y: mouseY});
    }
  
}


function mouseReleased(){
    if(mouseX<500&&mouseX>=0&&mouseY>10&&mouseY<800&&gameState=="onSling"){
    slingshot.fly();
    gameState = "launched";
    hit-=1;
    }
}

function keyPressed(){
    if(keyCode === 32&&gameState == "launched"){
        bon.trajectory=[];
        Matter.Body.setPosition(bon.body,{x:250,y:350})
       slingshot.attach(bon.body);
       num+=1;
       gameState="onSling";
    }
    if(hit==0){
        life = life-1;
        hit +=2;
    }
    if(life==3&&hit==2){
        World.remove(world,heart3.body);
        Matter.Body.setPosition(heart3.body,{x:20000,y:5000000})
        Matter.Body.setPosition(bird.body,{x:20000,y:5000000})
        World.remove(world,bird.body);
       Matter.Body.setPosition(bird1.body,{x:200,y:350})
        bon=bird1;
        slingshot.attach(bon.body);
    }
    else if(life==2&&hit==2){
        World.remove(world,heart2.body);
        Matter.Body.setPosition(heart2.body,{x:20000,y:5000000})
        Matter.Body.setPosition(bird1.body,{x:20000,y:5000000})
        Matter.Body.setPosition(bird2.body,{x:200,y:350})
        bon=bird2;
        slingshot.attach(bon.body);
    }
    else if(life==1&&hit==2){
        World.remove(world,heart1.body);
        Matter.Body.setPosition(heart1.body,{x:20000,y:5000000});
        Matter.Body.setPosition(bird2.body,{x:20000,y:5000000})
       Matter.Body.setPosition(bird3.body,{x:200,y:350}) 
        bon = bird3;
        slingshot.attach(bon.body);

       
    }
    else if(life<=0&&hit<=2){
        World.remove(world,heart.body);
        Matter.Body.setPosition(heart.body,{x:20000,y:5000000})
        Matter.Body.setPosition(bird3.body,{x:200,y:350}) 
        bon = null;
        slingshot.vanish();
       
       
    }
   
} 

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=08 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}