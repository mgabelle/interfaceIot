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

var blind12 = "";
var blind32 = "";

function getStateBlind(number){
    var xhttp = new XMLHttpRequest();
    var urlBlindState = url + "blindState/"+number;
    console.log(urlBlindState)
    xhttp.open("GET",urlBlindState);
    xhttp.onload = function() {
        var el = "";
        console.log(this.responseText + " => BLIND "+number);
        let result = this.responseText;
        if(number ==12){
            blind12=result;
            console.log("OK");
        }
        if(number == 32){
            blind32=result;
            console.log("ok");
        }
        if(this.responseText == "1"){
            el = "OUVERT";
        } else {
            el = "FERMÉ";
        }

        document.getElementById('blind-state-'+number).innerHTML = "La volet est " + el;
    }
    xhttp.send();
}

var lumi = "";

function getLumiState(number){
    var xhttp = new XMLHttpRequest();
    var urlLumiState = url + "lumiState/"+number;
    console.log(urlLumiState)
    xhttp.open("GET",urlLumiState);
    xhttp.onload = function() {
        lumi = this.responseText;
    }
    xhttp.send();
}

function changeLumi(number){
    var el = "";
    console.log("lumi = "+lumi + " => LUMI "+number);
    if(lumi == "1"){
        el = "JOUR";
    } else {
        el = "NUIT";
    }

    document.getElementById('lumi-state').innerHTML = "Il fait " + el;
}   


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

function blindAllOn(){
    blindUp(12);
    blindUp(32);
}

function blindAllDown(){
    blindDown(12);
    blindDown(32);
}

// Mode automatique
var autom = false;

$(document).ready(function(){
    $("#desactiveAuto").hide();
});


var changeMode = (bool) => {
    autom=bool;
    if(autom){
        $("#activeAuto").hide();
        $("#desactiveAuto").show();
    } else {
        $("#activeAuto").show();
        $("#desactiveAuto").hide();
    }
}

var isUp = () => {
    if(blind32=="1" || blind12=="1"){
        return true;
    }  else {
        return false;
    }
}

var isDown = () => {
    if(blind32=="0" || blind12=="0"){
        return true;
    }  else {
        return false;
    }
}

function modeAuto(){
    if(autom){
        // Si nuit + volets up alors on descend les rideaux et on allume la lumièreALL
        if(lumi=="0" && isUp()){
            lightAllOn();
            blindDown(12);
            blindDown(32);
        } else if (lumi="1" && isDown()){
            lightAllOff();
            blindUp(12);
            blindUp(32);
        }
    } else {
        console.log("Mode auto desactivé");
    }
}


// Events Listeners
window.setInterval(()=>getStateLight(11),1000);
window.setInterval(()=>getStateLight(13),1000);
window.setInterval(()=>getStateBlind(12),1000);
window.setInterval(()=>getStateBlind(32),1000);
window.setInterval(()=>getLumiState(5),1000);
window.setInterval(()=>changeLumi(),1000);
window.setInterval(modeAuto,2000);