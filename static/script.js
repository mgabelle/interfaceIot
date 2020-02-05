console.log('script.js loaded');
// This script is for API
var url = "http://10.42.0.237:5000/" //Main --> URL

/*
Light 11 == Cuisine
light 13 == Chmabre
*/
// State light
var state11 = 0;
var state13 = 0;

// Open a light
function lightOn(light){
    var url1 = url + "lightOn/";
    url1 += light;
    return url1;
}

function lightOff(light){
    var url2 = url + "lightOff/";
    url2 += light;
    return url2;
}

// API AJAX for Lights 
function useApi(state,light){
    var xhttp = new XMLHttpRequest();
    var finalUrl;
    if(state=='off'){
        finalUrl = lightOff(light);
    } else {
        finalUrl = lightOn(light);
    }
    console.log(state + " ; " + light);
    xhttp.open("GET",finalUrl,true);
    xhttp.send();
}

// lightAll
function lightAllOn(){
    var xhttp =new XMLHttpRequest();
    xhttp.open("GET",url+"lightOn/11/13");
    xhttp.send();
}

function lightAllOff(){
    var xhttp =new XMLHttpRequest();
    xhttp.open("GET",url+"lightOff/11/13");
    xhttp.send();
}

// Get state of the light && blind
var urlState = url + "lightState/";

function getState(){
    var xhttp = new XMLHttpRequest();

    // cuisine
    xhttp.open("GET",urlState+"11");
    xhttp.onload = function() {
        var el = "";
        // console.log(this.responseText + " => type:"+typeof response);
        if(this.responseText == "1"){
            el = "ALLUMEE";
        } else {
            el = "ETEINTE";
        }

        document.getElementById('cuisine').innerHTML = "La lumière est " + el;
    }
    xhttp.send();

    var xhttp = new XMLHttpRequest();

    // cuisine
    xhttp.open("GET",urlState+"13");
    xhttp.onload = function() {
        var el = "";
        var response = this.responseText;
        // console.log(response + " => type :"+typeof response);
        if(response == "1"){
            el = "ALLUMEE";
        } else {
            el = "ETEINTE";
        }

        document.getElementById('chambre').innerHTML = "La lumière est " + el;
    }
    xhttp.send();

    //volets
    var urlBlindState = url + "blindState/12";
    xhttp.open("GET",urlBlindState);
    xhttp.onload = function() {
        var el = "";
        var response = this.responseText;
        // console.log(response + " => type :"+typeof response);
        if(response == "1"){
            el = "OUVERT";
        } else {
            el = "FERMÉ";
        }

        document.getElementById('blind-state').innerHTML = "La volet est " + el;
    }
    xhttp.send();
}

// window.setInterval(getState,3000);


/* 
Script pour controler les volets 
Les chemins : 
    - /blindDown/12
    - /blindUp/12
*/

function blindUp(number){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",url+"blindUp/"+number);
    xhttp.send();
}

function blindDown(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",url+"blindDown/"+number);
    xhttp.send();
}

