console.log('script.js loaded');
// This script is for API
var url = "http://10.42.0.123:5000/" //Main --> URL

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
    xhttp.open("GET",url+"lightAllOn/11/13");
    xhttp.send();
}

function lightAllOff(){
    var xhttp =new XMLHttpRequest();
    xhttp.open("GET",url+"lightAllOff/11/13");
    xhttp.send();
}

// Get state of the light && blind
var urlState = url + "lightState/";

function getStateLight(number){
    var xhttp = new XMLHttpRequest();

    // cuisine
    xhttp.open("GET",urlState+number);
    xhttp.onload = function() {
        var el = "";
        console.log(this.responseText + " => light "+number);
        if(this.responseText == "1"){
            el = "ALLUMÉE";
        } else {
            el = "ÉTEINTE";
        }

        document.getElementById('light-'+number).innerHTML = "La lumière est " + el;
    }
    xhttp.send();

    var xhttp = new XMLHttpRequest();
}
    // // chambre
    // xhttp.open("GET",urlState+"13");
    // xhttp.onload = function() {
    //     var el = "";
    //     console.log(this.responseText + " => 13");
    //     if(this.responseText == "1"){
    //         el = "ALLUMEE";
    //     } else {
    //         el = "ETEINTE";
    //     }

    //     document.getElementById('chambre').innerHTML = "La lumière est " + el;
    // }
    // xhttp.send();

    //volets
function getStateBlind(number){
    var xhttp = new XMLHttpRequest();
    var urlBlindState = url + "blindState/"+number;
    console.log(urlBlindState)
    xhttp.open("GET",urlBlindState);
    xhttp.onload = function() {
        var el = "";
        console.log(this.responseText + " => BLIND "+number);
        if(this.responseText == "1"){
            el = "OUVERT";
        } else {
            el = "FERMÉ";
        }

        document.getElementById('blind-state').innerHTML = "La volet est " + el;
    }
    xhttp.send();
}
    

// window.setInterval(()=>getStateLight(11),3000);
// window.setInterval(()=>getStateLight(13),3000);
// window.setInterval(()=>getStateBlind(12),3000);


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

function blindDown(number){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",url+"blindDown/"+number);
    xhttp.send();
}

