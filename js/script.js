/*eslint-env browser*/
/* eslint-env es6 */
/* eslint-disable no-console */

//Splashscreen & Audio annotation met timer
var initialSplashscreenDelayTimer = 8000;

setTimeout(function () {
    'use strict';

    document.getElementById("splashScreen").style.display = "none";
    document.getElementById("tempBlur").style.filter = "blur(0px)";
    document.getElementById("musicAnotation").style.display = "none";
}, initialSplashscreenDelayTimer);

//Wanneer het document geladen is, voer deze dingen uit
window.onload = function () {

    //Splashcreen laadbalk
    function loadingBarSplashscreen() {

        var loadingBar = document.getElementById("line");
        var width = 1;
        var interval = setInterval(scene, initialSplashscreenDelayTimer / 100 - 5);

        function scene() {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width++;
                loadingBar.style.width = width + '%';
            }
        }
    }
    loadingBarSplashscreen();

    'use strict';
    //Datum van vandaag/verleden/toekomst inladen bij alle "date" classes 
    function loadDateBlog() {

        var currentDate = new Date();

        var z = currentDate.getFullYear() + " - " + (currentDate.getMonth() + 1) + " - " + currentDate.getDate();

        var allDateClasses = document.getElementsByClassName("date");

        for (var i = 0; i < allDateClasses.length; i++) {
            allDateClasses[i].innerHTML = z;
        }

    }
    loadDateBlog();

    function close() {
        var closeSplashscreen = document.getElementById("closeSplashscreen");
        var x = true;
        var pauseSound = new Audio("./music/smb_pause.wav");

        //Close splashscreen by clicking cross
        closeSplashscreen.onclick = function() {

            if (x === true) {


                document.getElementById("splashScreen").style.display = "none";
                document.getElementById("tempBlur").style.filter = "blur(0px)";         
                x = false;

                pauseSound.volume = 0.3;
                pauseSound.play();
                pauseSound.currentTime = 0;

            } else {
                void(0);      
            }      
        }

    }
    close();

    function setlikes() {
        var likes = Math.floor(Math.random() * 101);
        var coinSound = new Audio("./music/smb_coin.wav");

        var allLikes = document.getElementsByClassName("outputLikes");

        var allHearts = document.getElementsByClassName("allHearts");

        // Set initial Likes //
        for (var i = 0; i < allLikes.length; i++) {
            allLikes[i].innerHTML = likes + " likes";
        }

        allHearts[0].onclick = function() {
            likes += 1;
            allLikes[0].innerHTML = likes + " likes";
            likes -= 1;
            allHearts[0].src = "./img/heartFilled.svg";
            coinSound.volume = 0.5;
            coinSound.play();
            coinSound.currentTime = 0;
        }

        allHearts[1].onclick = function() {
            likes += 1;
            allLikes[1].innerHTML = likes + " likes";
            likes -= 1;
            allHearts[1].src = "./img/heartFilled.svg";
            coinSound.volume = 0.5;
            coinSound.play();
            coinSound.currentTime = 0;
        }

        allHearts[2].onclick = function() {
            likes += 1;
            allLikes[2].innerHTML = likes + " likes";
            likes -= 1;
            allHearts[2].src = "./img/heartFilled.svg";
            coinSound.volume = 0.5;
            coinSound.play();
            coinSound.currentTime = 0;
        }
    }
    setlikes();

    function clickAudioCoinPlay() {
        var pipeSound = new Audio("./music/Pipe.wav");
        var audioTopMenu = document.getElementsByClassName("audioTopMenu");

        for (var i = 0, len = audioTopMenu.length; i < len; i++) {
            audioTopMenu[i].addEventListener("click", function() {
                pipeSound.play();
                pipeSound.currentTime = 0;
            });


        }
    }
    clickAudioCoinPlay();

    //Titlebar scroll
    function animateTitle(Title = "SwITch traject 2021", delay = 200) {

        var counter = 0;
        var direction = true;
        var newtitle

        aniTitle = setInterval(function () {
            if (counter == Title.length)
                direction = false;
            if (counter == false)
                direction = true;
            counter = (direction == true) ? ++counter : --counter;
            newtitle = (counter == 0) ? "" : Title.slice(0, counter);
            document.title = newtitle;
        }, delay)
    }
    animateTitle();

};

//Show/hide hamburgerMenu
function showHamburgerMenu() {

    'use strict';
    var x = document.getElementById("hamburgerMenuList");

    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}


//Read XML
var y = 0;

function loadXMLDoc(i) {
    'use strict';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            loadXMLTestimonials(this, i);
        }
    };
    xmlhttp.open("GET", "./XML/testimonials.xml", true);
    xmlhttp.send();
}


//Load next/previous XML lines
function loadXMLTestimonials(xml, i) {
    'use strict';
    var x;
    var xmlDoc = xml.responseXML;

    if (i >= 1 && i <= 7) {
        x = xmlDoc.getElementsByTagName("TESTIMONIAL");
        document.getElementById("nameXML").innerHTML = x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
        document.getElementById("FeedbackXML").innerHTML = x[i].getElementsByTagName("COMMENT")[0].childNodes[0].nodeValue;
    } else {
        i = 0;
        y = 0;
        x = xmlDoc.getElementsByTagName("TESTIMONIAL");
        document.getElementById("nameXML").innerHTML = x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue;
        document.getElementById("FeedbackXML").innerHTML = x[i].getElementsByTagName("COMMENT")[0].childNodes[0].nodeValue;
    }
}

//Write & download XML

function createAndDownloadXML() {
    'use strict';
    var filledInName = document.getElementById('name').value;
    var filledInFeedback = document.getElementById('feedback').value;
    var lineBreak = '\n';

    var fileName = "mijnWijzeWoorden.xml";

    var Merge = new Blob(['<?xml version="1.0" encoding="UTF-8"?>', lineBreak, "<TESTIMONIALS>", lineBreak, "<TESTIMONIAL>", lineBreak, "<NAME>", filledInName, "</NAME>", lineBreak, "<COMMENT>", filledInFeedback, "</COMMENT>", lineBreak, "</TESTIMONIAL>", lineBreak, "</TESTIMONIALS>"], { type: 'text/plain' });

    var downloadDocument = document.createElement('a');
    downloadDocument.download = fileName;
    downloadDocument.href = window.URL.createObjectURL(Merge);
    downloadDocument.click();
}