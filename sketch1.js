const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot,bird1,bird2,bon,heart,heart1,heart2;
var life = 3;
var num = 0;
var hit = 2;
var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var log11,log12,log13,log4;
function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1530,750);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(1530/2,height,1530,20);
    platform = new Ground(180, 605, 400, 240);

    box1 = new Box(700,670,70,70);
    box2 = new Box(920,670,70,70);
    pig1 = new Pig(810, 650);
    log1 = new Log(810,630,300, PI/2);

    box3 = new Box(700,590,70,70);
    box4 = new Box(920,590,70,70);
    pig3 = new Pig(810, 615);

    log3 =  new Log(810,530,300, PI/2);

    box5 = new Box(810,510,70,70);
    log4 = new Log(760,470,150, PI/6);
    log5 = new Log(870,470,150, -PI/6);

    bird = new Bird(250,350);
    bird1 = new Bird1(150,200);
    bird2 = new Bird2(70,200);
    bon = bird;
    log6 = new Log1(810,700,400, PI/2);
    log11 = new Log1(1210,600,400, PI/2);
    box11 = new Box(1100,570,70,70);
    box21 = new Box(1320,570,70,70);
    pig11 = new Pig(1210, 550);
    log111 = new Log(1210,530,300, PI/2);

    box31 = new Box(1100,490,70,70);
    box41 = new Box(1320,490,70,70);
    pig31 = new Pig(1210, 515);

    log31 =  new Log(1210,430,300, PI/2);

    box51 = new Box(1210,410,70,70);
    log41 = new Log(1160,370,150, PI/6);
    log511 = new Log(1270,370,150, -PI/6);
    slingshot = new SlingShot(bon.body,{x:250, y:350});
    heart = new Heart(750,85,50,50);
    heart1 = new Heart(820,85,50,50);
    heart2 = new Heart(890,85,50,50);
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
    box1.display();
    box11.display();
    box2.display();
    box21.display();
    ground.display();
    pig1.display();
    pig1.score();
    pig11.display();
    pig11.score();
    log1.display();
    log111.display();

    box3.display();
    box31.display();
    box4.display();
    box41.display();
    pig3.display();
    pig3.score();
    pig31.display();
    pig31.score();
    log3.display();
    log31.display();

    box5.display();
    box51.display();
    log4.display();
    log41.display();
    log5.display();
    log511.display();

    bird.display();
    bird1.display();
    bird2.display();
    platform.display();
    heart.display();
    heart1.display();
    heart2.display();
    log6.display();
    log11.display();
    slingshot.display();    
    if(score>=700){
        bon = null;
        hit = 0;
        textStyle("bold");
        textSize(100);
        fill(random(0,255),random(0,255),random(0,255))
        text("Birdie !",600,300);
    }
    if(score==0&&life!=0){
        text("Good Luck !",650,300);
    }
    else if(score==200&&life!=0){
        text("You Are Good !",540,300);
    }
    else if(score==400&&life!=0){
        text("Excellent !",580,300);
    }
    else if(score==600&&life!=0){
        text("Outstanding !",550,300);
    }
    if(life<=0&&hit<=2&&score<=600){
        if(score==0){
            text("Better Luck Next Time !",500,350);
            text("4 Pigs Are Still There",520,300);
         }
         if(score==200){
            text("Better Luck Next Time !",500,350);
            text("3 Pigs Are Still There",520,300);
         }
         if(score==400){
            text("Better Luck Next Time !",500,350);
            text("2 Pigs Are Still There",520,300);
         }
         if(score==600){
           
            text("Better Luck Next Time !",500,350);
            text("1 Pig Is Still There",540,300);
         }
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
        life = life-1
        hit +=2
    }
    if(life==2&&hit==2){
        World.remove(world,heart2.body);
        Matter.Body.setPosition(heart2.body,{x:20000,y:5000000})
        Matter.Body.setPosition(bird.body,{x:20000,y:5000000})
        World.remove(world,bird.body);
        Matter.Body.setPosition(bird1.body,{x:200,y:350})
        bon=bird1;
        slingshot.attach(bon.body);
    }
    else if(life==1&&hit==2){
        World.remove(world,heart1.body);
        Matter.Body.setPosition(heart1.body,{x:20000,y:5000000})
        Matter.Body.setPosition(bird1.body,{x:20000,y:5000000})
        Matter.Body.setPosition(bird2.body,{x:200,y:350})
        bon=bird2;
        slingshot.attach(bon.body);
    }
    else if(life<=0&&hit<=2){
        World.remove(world,heart.body);
        Matter.Body.setPosition(heart.body,{x:20000,y:5000000});
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