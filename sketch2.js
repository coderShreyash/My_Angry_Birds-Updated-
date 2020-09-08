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
    platform = new Ground(180, 605, 400, 240);
    base_1 = new Log1(700,600,300,PI/2);
    base_2 = new Log1(1000,500,220,PI/2);
    base_22 = new Log1(1100,440,100,PI);
    box1 = new Box(650,570,80,50);
    box2 = new Box(750,570,80,50);
    box3 = new Box(700,570,80,50);
    box4 = new Box(700,470,100,50);
    box5 = new Box(700,395,80,50);
    box6 = new Box(700,335,100,50);
    box7 = new Box(750,335,60,50);
    box8 = new Box(650,335,60,50);
    sup1 = new Box(770,520,40,100);
    sup2 = new Box(630,520,40,100);
  
    log1= new Log(700,430,240,PI/2);
    log2= new Log(700,360,240,PI/2);
   
   
    pig1 = new Pig(700,520);
    pig2 = new Pig(620,395);
    pig3 = new Pig(770,395);
    pig4 = new Pig(935,465);
    pig5 = new Pig(1060,440);
    pig6 = new Pig(935,465);
    pig7 = new Pig(1060,440);
    pig10=new Piggy(960,465,100,100)
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
    base_1.display();
    base_2.display();
    base_22.display();
    box1.display();
    pig1.score();
    pig1.display();
    pig2.score();
    pig2.display();
    pig3.score();
    pig4.display();
    pig4.score();
    pig3.display();
    pig5.score();
    pig5.display();
    pig6.score();
    pig6.display();
    pig10.score();
    pig10.display();
    pig7.score();
    pig7.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();
    box7.display();
    box8.display();
    sup1.display();
    sup2.display();
    
    bird.display();
    bird1.display();
    bird2.display();
    bird3.display();
    log1.display();
    log2.display();

  
    platform.display();
    heart.display();
    heart1.display();
    heart2.display();
    heart3.display();
    fill("orange");
   
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
        text("Good Luck !",600,250);
    }
    else if(score<=400&&life!=0){
        text("You Are Good !",540,300);
    }
    else if(score<=800&&life!=0){
        text("Awesome !",580,300);
    }
    else if(score<=1200&&life!=0){
        text("Superb !",550,300);
    }
    else if(score<=1400&&life!=0){
        text("Outstanding !",550,300);
    }
    else if(score<=1600&&life!=0){
        text("Marvellous !",550,300);
    }
    else if(score<=1800&&life!=0){
        text("Fabulous !",550,300);
    }
    else if(score<2000&&life!=0){
        text("Tremendous !",550,300);
    }
    else if(score<2200&&life!=0){
        text("Fantastic !",550,300);
    }
    if(life<=0&&hit<=2&&score<=1400){
        if(score==0){
            text("Better Luck Next Time !",500,350);
            text("8 Pigs Are Still There",520,300);
            hit = 0;
         }
         if(score==200){
            text("Better Luck Next Time !",500,350);
            text("7 Pigs Are Still There",520,300);
            hit = 0;
         }
         if(score==400){
            text("Better Luck Next Time !",500,350);
            text("6 Pigs Are Still There",520,300);
            hit = 0;
         }
         if(score==600){
            hit = 0;
            text("Better Luck Next Time !",500,350);
            text("5 Pigs Are Still There",520,300);
         }
         if(score==800){
            hit = 0;
            text("Better Luck Next Time !",500,350);
            text("4 Pigs Are Still There",520,300);
         }
         if(score==1000){
            hit = 0;
            text("Better Luck Next Time !",500,350);
            text("3 Pigs Are Still There",520,300);
         }
         if(score==1200){
            hit = 0;
            text("Better Luck Next Time !",500,350);
            text("2 Pigs Are Still There",520,300);
         }
         if(score==1400){
            hit = 0;
            text("Better Luck Next Time !",500,350);
            text("1 Pig Is Still There",520,300);
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