img="";
status=""
object=[];
objectDetector="";
function setup() {
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status : detecting objects";
}
function preload() {
    img=loadImage('dog_cat.jpg');
}
function draw() {
    image(video,0,0,380,380);
   
    if (status !="") {
        objectDetector.detect(video,gotResult);
        for (i=0;i<object.lenght;i++) {
            r=random(255);
            g=random(255);
            b=random(255);
            document.getElementById("status").innerHTML="status : detecting objects";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
            document.getElementById("number_of_objects").innerHTML="number of objects detcted :"+object.lenght;
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }  

}
function modelLoaded() {
    console.log("modelLoaded!!");
     status=true;
     objectDetector.detect(video,gotResult);
}
function gotResult(error,results) {
    if (error) {
        console.log(error);
        
    }
    console.log(results);
    object=results;
}
