var speech_recognition = window.webkitSpeechRecognition;

var recognition = new speech_recognition();

function start()
{
    document.getElementById("textbox").innerHTML = " ";
    recognition.start();
}

recognition.onresult = function(event)
{
    console.log(event);

    content = event.results[0][0].transcript;

    console.log(content);

    document.getElementById("textbox").innerHTML  = content;

    if(content == "Take my selfie.")
    {
        console.log("take my selfie");

        speak();
    }
}

function speak()
{                                                                              
    var synth = window.speechSynthesis;

    var speakData = "taking your selfie in 5 seconds";

    var utter_this = new SpeechSynthesisUtterance(speakData);

    synth.speak(utter_this);

    Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
}

Webcam.set({
    width:360,
    height:250,
    image_format:'png',
    png_quality:500,
});

camera = document.getElementById("camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_img" src="' + data_uri + '">/';

    });
}

function save()
{
    link = document.getElementById("link");
    image = document.getElementById("selfie_img").src;
    link.href = image;
    link.click();
}