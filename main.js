video = "";
Status = "";
objects = [];

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(480 , 380);
    canvas.center();
}

function draw(){
    image(video , 0 , 0 , 480 , 380);

    if(Status != ""){
        objectDetector.detect(video , gotResults);

        
    }

    for(i = 0; i<objects.length; i++){
        document.getElementById("status").innerHTML = "status: objects detected";
        document.getElementById("number_of_objects").innerHTML = "number of objects detected are: " + objects.length;
        fill("red");
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
        noFill()
        stroke("red");
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
}

function modelLoaded(){
    console.log("model loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
}

function gotResults(error , results){
    if(error ){
        console.log(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}


