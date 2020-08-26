var monkey,ground;
var bananagroup,obstaclegroup;
var bananaimage,obstacleimage,backscreen;
var score;

function preload(){
  backimage=loadImage("jungle.png");
  
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaimage=loadImage("banana.png");
  obstacleimage=loadImage("stone.png");
}



function setup() {
  createCanvas(400,400);
  backscreen = createSprite(400,200,20,20);
  backscreen.addImage(backimage);
  backscreen.velocityX=-4;
  backscreen.scale=2.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  
  
  monkey = createSprite(100,320,20,20);
  monkey.addAnimation("monkey",player_running);
  monkey.scale=0.1;
  
  bananagroup= new Group();
  obstaclegroup= new Group();
  
  score=0;
}

function draw() {
  background(220);
  
  ground.x=ground.width/2;
  ground.visible=false;
  
  if(backscreen.x<0){
  backscreen.x=backscreen.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -6;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  food();
  obstacles();
  drawSprites();
  
 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,300,50);
  
  
  if(bananagroup.isTouching(monkey)){
    score=score+2;
    bananagroup.destroyEach();
    
  }
  
  switch(score){
    case 10 :monkey.scale=0.12;
      break;
      case 20:monkey.scale=0.14;
      break;
      case 30:monkey.scale=0.16;
      break;
      case 40:monkey.scale=0.18;
      break;
      default:break;
  }

  if(obstaclegroup.isTouching(monkey)){
    monkey.scale=0.12;
  }
  
}


function food(){
  if (frameCount % 80 === 0){
    var banana = createSprite(200,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaimage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 100;
    bananagroup.add(banana);
  }
}

function obstacles(){
if (frameCount % 300 === 0){
  var obstacle = createSprite(400,335,10,10);
  obstacle.addImage(obstacleimage);
  obstacle.scale=0.15;
  obstacle.velocityX = -3;
  obstacle.lifetime = 100;
  obstaclegroup.add(obstacle);
}
}
