
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;
var jungle, jungleImage;

function preload(){
  
  jungleImage = loadImage("jungle.jpg");
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup( ) {
  createCanvas(400,400);
  
  //Create Jungle sprite
  jungle = createSprite(250,150,500,500);
  jungle.addImage("jungle",jungleImage);
  jungle.velocityX = -5; 
  jungle.x = jungle.width /2 ;
  
  
  //Create Monkey sprite
  monkey = createSprite(80,315,20,20);  
  monkey.addAnimation("Moving", monkey_running);
  monkey.scale=0.1;
  
  //creating ground sprite 
  ground = createSprite(400, 350, 900, 10);
  ground.visible = false;
  
  //creating groups of food and obstacles
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  
  score = 0;
  
}


function draw() {
  
  background("white");
  monkey.collide(ground)
  

  
    if(gameState === PLAY){
      
        food();
  obstacle();
    
    if(jungle.x < 0){
      jungle.x = jungle.width/2
    }
  
  //making monkey collide with ground
  monkey.collide(ground);
      
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  


  
     if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
  monkey.velocityY += 0.8;
  
      switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;                 
        default: break;
    }
      
      
  
    if(obstacleGroup.isTouching(monkey)){ 
        monkey.scale=0.02;
      gameState = END
    }
    }
 
      if (gameState === END ) {
        
          if (monkey.isTouching(obstacleGroup)) {
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0;
    monkey.velocityY=0;
    survivalTime=0;
  }
  
      
    }
 
 
    
  
  drawSprites();
  
   stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("SurvivalTime:" + survivalTime, 100, 50);
  //displaying score
  text("Score: "+ score, 200,100);
  
    
}


function food() {
  if (frameCount % 100 == 0) {
    //creating banana sprite 
    banana = createSprite(400, Math.round(random(120, 200)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;
    FoodGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth += 1;
  }
}
//creating function of obstacles
function obstacle() {
  if (frameCount % 50 === 0) {
    //creating obstracle sprite and adding image to it
    rock = createSprite(600,330,10,40);
    rock.addImage(obstacleImage);
    rock.scale = 0.1;
    rock.velocityX = -4;
    rock.lifetime = 300;
    obstacleGroup.add(rock);
  }
}                   






