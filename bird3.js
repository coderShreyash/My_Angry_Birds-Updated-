class Bird3 extends BaseClass {
    constructor(x,y){
      super(x,y,90,70);
      this.image = loadImage("sprites/download.png");
      this.smokeImage = loadImage("sprites/smoke.png");
      this.trajectory =[];
    }
  
    display() {
      //this.body.position.x = mouseX;
      //this.body.position.y = mouseY;
  
      super.display();
  
      if(this.body.velocity.x > 10 && this.body.position.x > 300){
        var position = [this.body.position.x, this.body.position.y];
        this.trajectory.push(position);
      }
     
     
      for(var i=0; i<this.trajectory.length; i++){
        image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
      }
    }
  }
  