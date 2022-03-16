

var doodle
var fondo, fonfo
var floor
var base
var box1
var score=0
var gameState=0
function preload(){
  fondoimg=loadImage("fondojump.jpg")
  doodleimg=loadImage("doodle.png")
  picosimg=loadImage("picos.png")
  pisoimg=loadImage("piso.jpg")
  foodimg=loadImage("food.png")

}
function setup(){
  createCanvas(400,600)
  
  fondo=createSprite(70,450,200,800)
  fondo.addImage(fondoimg)
  fondo.scale=2
  fonfo=createSprite(290,450,200,800)
  fonfo.addImage(fondoimg)
  fonfo.scale=2
  fondo2=createSprite(70,100)
  fondo2.addImage(fondoimg)
  fondo2.scale=2
  fonfo2=createSprite(290,100)
  fonfo2.addImage(fondoimg)
  fonfo2.scale=2
doodle=createSprite(180,400,20,20)
doodle.addImage(doodleimg)
doodle.scale=0.12
doorGroup=new Group();
  climberGroup=new Group();
  foodGroup= new Group();
  invisibleBlockGroup=new Group();
  

base1=createSprite(180,490,50,10)
base1.addImage(pisoimg)
base1.scale=0.7

base2=createSprite(50,200,50,10)
base2.addImage(pisoimg)
base2.scale=0.7

base3=createSprite(350,50,50,10)
base3.addImage(pisoimg)
base3.scale=0.7
}
function draw(){
  if(gameState===0){
    background("black")
if(keyCode===32){
  gameState+=+1
  doodle.velocityY=2
  base1.velocityY=1.2
  base2.velocityY=1.2

  base3.velocityY=1.2



}
  }
  if(gameState===1){
    if(keyDown("left")){
      doodle.x+=-3
    }
    if(keyDown("right")){
      doodle.x+=3
    }
    if(keyDown("space")&&doodle.y>170){
      doodle.velocityY=-5
    }
    doodle.velocityY+=+0.3
    
    if(climberGroup.isTouching(doodle)){
      doodle.velocityY=0
    }
    spawnDoor();
    
  console.log(doodle.y)
  if(doodle.isTouching(invisibleBlockGroup)){
    doodle.destroy();
  gameState+=+1
  }
   doodle.collide(base1)
   doodle.collide(base2)
   doodle.collide(base3)
  if(doodle.isTouching(foodGroup)){
    foodGroup.destroyEach()
    score+=+1
  }
  drawSprites();

  text("SCORE: "+score,20,30)

  }
if(gameState===2){
  background("black")
  text("YOU LOSE",200,200)
}


  }
  function spawnDoor(){
    if(frameCount%130===0){
      door=createSprite(Math.round(random(30,360)),-50,100,20)
      door.velocityY=1
      
      door.lifetime=700
      doorGroup.add(door);
      door.visible=false

      climber=createSprite(door.x,15,100,20)
      
      climber.velocityY=1.3
      climber.lifetime=700
      climber.addImage(pisoimg)
      climber.scale=0.7
      climberGroup.add(climber)
      invisibleBlock=createSprite(door.x,climber.y+13)
      invisibleBlock.width=climber.width
      invisibleBlock.height=2
      invisibleBlock.velocityY=1.3
      invisibleBlock.visible=true
      invisibleBlock.addImage(picosimg)
      invisibleBlock.scale=0.2
      invisibleBlockGroup.add(invisibleBlock)
      invisibleBlock.lifetime=700
      food=createSprite(climber.x,climber.y-26,10,10)
      food.addImage(foodimg)
      food.scale=0.18
      foodGroup.add(food)
      food.velocityY=1.3
      food.lifetime=700
      doodle.depth=door.depth
      doodle.depth+=1
      
      doodle.depth=climber.depth
      doodle.depth+=1
      
    }
  }

