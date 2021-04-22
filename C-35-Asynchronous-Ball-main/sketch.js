
var hball;
var db;
var hbpos;
var backgroundImg
var ballonImg
function preload(){
backgroundImg=loadImage("hotAirBalloon2")
balloonImg=loadImage("hotAirBalloon")

}

function setup(){



    createCanvas(500,500);
    hball = createSprite(250,250,10,10);
    hball.addImage(balloonImg);
    

    db=firebase.database();
    hbpos=db.ref('ball/position');
    hbpos.on("value", readPosition, showError);
}

function draw(){
    background(backgroundImg);
    if(keyDown(LEFT_ARROW)){
        //changePosition(-1,0);
        writePosition(-1,0)
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    hball.x = hball.x + x;
    hball.y = hball.y + y;
}

function readPosition(data){
    pos=data.val();
    console.log(pos.x,pos.y)
    hball.x=pos.x;
    hball.y=pos.y;
}

function writePosition(x,y){
    hbpos.set({
        'x':hball.x+x,
        'y':hball.y+y,
    })
}

function showError(){
    console.log("Error in writing to the database");
}