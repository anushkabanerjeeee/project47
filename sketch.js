var bg,bgImg;
var player, shooterImg, shooter_shooting,heart1,hear2,heart3;
var ghost,ghostGroup,ghostImg,bullet,bulletImg,bulletGroup,bullets=9,heartImg1,heartImg2,heartImg3
var life = 3
var score = 0
var gameState = "play"
var wonPlaySound,losePlaySound,explosionPlaySound


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/background1.jpg")
  ghostImg = loadImage("assets/ghost.png")
  bulletImg = loadImage("assets/bullet.png")

  heartImg1 = loadImage("assets/heart_1.png")
  heartImg2 = loadImage("assets/heart_2.png")
  heartImg3 = loadImage("assets/heart_3.png")

  wonPlaySound = loadSound("assets/win.mp3")
  losePlaySound = loadSound("assets/lose.mp3")
  explosionPlaySound = loadSound("assets/explosion.mp3")


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40)
bg.addImage(bgImg)
bg.scale = 0.4

ghostGroup = new Group()
bulletGroup = new Group()

heart1 =  createSprite(displayWidth-150,40,20,20)
heart1.addImage("heart1",heartImg1)
heart1.visible = false
heart1.scale = 0.5

heart2 =  createSprite(displayWidth-150,40,20,20)
heart2.addImage("heart2",heartImg2)
heart2.visible = false
heart2.scale = 0.5

heart3 =  createSprite(displayWidth-200,40,20,20)
heart3.addImage("heart3",heartImg3)
heart3.visible = true
heart3.scale = 0.5


//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0);
  if(gameState==="play"){

  
if(life == 3){
  heart1.visible = false
  heart2.visible = false
  heart3.visible = true
}
if(life == 2){
  heart1.visible = false
  heart2.visible = true
  heart3.visible = false
}
if(life == 1){
  heart1.visible = true
  heart2.visible = false
  heart3.visible = false
}
if(life==0){
heart1.visible=false
heart2.visible=false
heart3.visible=false
}

spawnGhost()
  }

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(life==0){
  gameState = "lost"
  losePlaySound.play()
}
if(score==100){
  gameState = "won"
  wonPlaySound.play()
  
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet = createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.addImage(bulletImg)
 bullet.scale = 0.04
 bullet.velocityX = 20
 bulletGroup.add(bullet)
 bullet.depth=player.depth
 player.depth=player.depth+1
 if(bullets>0){
  bullets = bullets - 1
 }

 

  player.addImage(shooter_shooting)
 
}
if(bullets ==0){
  gameState = "noBullets"
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(ghostGroup.isTouching(bulletGroup)){
  for(var i=0;i<ghostGroup.length;i++){
    if(ghostGroup[i].isTouching(bulletGroup)){
      ghostGroup[i].destroy()
      bulletGroup.destroyEach()
      score = score + 2
      explosionPlaySound.play()
    }
  }
}
if(ghostGroup.isTouching(player)){
  for(var i=0;i<ghostGroup.length;i++){
    if(ghostGroup[i].isTouching(player)){
      ghostGroup.destroyEach()
      life=life-1
    }
  }
}
drawSprites();
textSize(20)
fill("white")
text("Score:"+score,displayWidth-230,displayHeight/2-230)
text("Life:"+life,displayWidth-230,displayHeight/2-260)
text("Bullets:"+bullets,displayWidth-230,displayHeight/2-290)
if(gameState==="won"){
textSize(100)
fill("green")
text("YOU WON",400,400)
ghostGroup.destroyEach()
player.destroy()
}
if(gameState ==="lost"){
  textSize(100)
  fill("red")
  text("YOU LOST",400,400)
  ghostGroup.destroyEach()
  player.destroy()
  }
  if(gameState =="noBullets"){
    textSize(100)
    fill("pink")
    text("You ran out of bullets",100,400)
    ghostGroup.destroyEach()
    player.destroy()
    bulletGroup.destroyEach()
    }

}
function spawnGhost(){
  if(frameCount%60===0){
    ghost=createSprite(random(500,1100),random(100,500),40,40)
ghost.addImage(ghostImg)
ghost.velocityX = -3
ghost.scale = 0.4
ghost.lifetime = 500
ghost.debug = true
ghostGroup.add(ghost)
ghost.setCollider("rectangle",0,0,200,400)
 }

}
