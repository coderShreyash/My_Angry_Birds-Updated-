class Heart{
    constructor(x,y,w,h){
        var options= {
            isStatic:true
        }
       this.body = Bodies.rectangle(x,y,w,h,options);
       this.w = w;
       this.h = h;
       this.Visiblity = 255;
       this.image= loadImage("sprites/Heart.png");
       World.add(world,this.body);
    }  
       display() {
           push()
           translate(this.body.position.x, this.body.position.y);
           imageMode(CENTER);
           image(this.image, 0, 0, this.w, this.h);
          pop()
       }
};