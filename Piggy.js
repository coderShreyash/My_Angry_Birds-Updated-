class Piggy extends BaseClass {
    constructor(x, y,w,h){
      super(x,y,w,h);
      this.image = loadImage("sprites/Piggy.png");
      this.Visiblity = 255;
    }
  
   display(){
     //console.log(this.body.speed);
     if(this.body.speed < 3){
      super.display();
     }
     else{
       World.remove(world, this.body);
       push();
       this.Visiblity = this.Visiblity - 5;
       tint(255,this.Visiblity);
       image(this.image, this.body.position.x, this.body.position.y, 0, 0);
       pop();
     }
    }
  
    score(){
      if (this.Visiblity < 0 && this.Visiblity > -5005){
        score++;
      }
    }
  
  
  
  };