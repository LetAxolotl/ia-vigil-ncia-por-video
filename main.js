
objects = [];
status = "";
video= "";

function preload(){
    video = createVideo('video.mp4');
}


function setup(){
    canvas = createCanvas (400, 401);
    canvas.center();
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
console.log("Modelo Carregado!")
status = true;
video.loop();
video.speed(0.9);
video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function draw() {
    image(video, 0, 0, 400, 401);
    if (status !== "") {
        objectDetector.detect(video, gotResult);
        // Atualiza o status e a quantidade de objetos uma vez fora do loop
        document.getElementById("status").innerHTML = "Status: Objetos detectados: ";
        document.getElementById("numberOfObjects").innerHTML = "Quantidade de Objetos Detectados: " + objects.length;

        for (i = 0; i < objects.length; i++) {
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
