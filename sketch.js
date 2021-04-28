var ball, ballpos;
var datab;
var position;

function setup(){
    datab=firebase.database();
    console.log(datab);
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ballpos = datab.ref('ball/position'); //refering to the location of the database value we want
    ballpos.on("value", readposition, showerror); //keeps listening to the changes in the database
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writeposition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writeposition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writeposition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writeposition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readposition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showerror(){
    console.log("error");
}

function writeposition(x, y){
    datab.ref("ball/position").set(
        {
        'x' : position.x + x,
        'y' : position.y + y
        }
    );
}