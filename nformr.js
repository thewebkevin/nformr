/*global $, jQuery*/

var peopleKilled;
var peopleInjured;
var city;
var cityAPI;
var state;
var crime;
var streetAddress;
var addressAPI;
var lawLong;
var lawShort;
var day;
var injured;
var killed;
var tfKilled;
var tfInjured;
var killedTense;
var injuredTense;
var addAnd;
var keyAPI = "AIzaSyANnAoaacT1T4QC7Kd9W6e9muA2CZb9FIM";
var googleMapUrl;
var generated = "<p>";
var victimform = "";

function getFormData() {
    "use strict";
    peopleKilled = document.getElementById('peopleKilled').value;
    peopleInjured = document.getElementById('peopleInjured').value;
    city = document.getElementById('city').value;
    cityAPI = city.replace(" ", "+");
    state = document.getElementById('state').value;
    crime = document.getElementById('crime').value.toLowerCase();
    streetAddress = document.getElementById('streetAddress').value;
    addressAPI = streetAddress.replace(" ", "+");
    lawLong = document.getElementById('lawLong').value;
    day = document.getElementById('day').value;
    googleMapUrl = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&markers=" + streetAddress + "+" + city + "+" +
        state + "&key=" + keyAPI;
    tfKilled = false;
    tfInjured = false;
    killed = " ";
    injured = " ";

    if (peopleKilled > 0) {
        tfKilled = true;
    }

    if (peopleInjured > 0) {
        tfInjured = true;
    }

    if (peopleKilled > 1) {
        killedTense = " people were ";
    } else {
        killedTense = " person was ";
    }

    if (peopleInjured > 1) {
        injuredTense = " people were ";
    } else {
        injuredTense = " person was ";
    }

    if (tfKilled) {
        killed = peopleKilled + killedTense + " killed ";
    }

    if (tfInjured && tfKilled) {
        addAnd = " and ";
    } else {
        addAnd = " ";
    }

    if (tfInjured) {
        injured = peopleInjured + injuredTense + " injured ";
    }

    if (lawLong.indexOf("Police") > -1) {
        lawShort = "Police";
    }
    if (lawLong.indexOf("Sheriff's") > -1) {
        lawShort = "Deputies";
    }

    generated += city.toUpperCase() + " - ";
    if (peopleKilled > 0 || peopleInjured > 0) {
        generated += lawShort + " say " + killed + addAnd + injured + " in a " + crime + " in " + city + " " + day + ".</p>";
        generated += "<p>According to the " + lawLong + ", " + killed + addAnd + injured + " in a " + crime + " at " + streetAddress + " in " + city + " " + day + ".</p>";
    } else {
        generated += lawShort + " are investigating a " + crime + " in " + city + " " + day + ".</p>";
        generated += "<p>The " + lawLong + " is currently investigating a " + crime + " at " + streetAddress + " in " + city + " " + day + ".</p>";
    }
    generated += "<p>This is a developing story. Stay tuned to <a href ='http://www.wbrz.com/'>WBRZ News 2</a> on <a href ='https://www.facebook.com/WBRZNews2'>Facebook</a> and <a href ='https://twitter.com/wbrz'>Twitter</a> for the lastest updates as they become available.</p>";

    if ($('#mapCheck').is(':checked')) {
        generated += "<img src='" + googleMapUrl + "'>";
    }
}

$(function () {
    "use strict";
    $("#generateButton").click(function () {
        generated = "<p>";
        getFormData();
        $("#generatedHTML").html(generated);

    });

    $("#generateHtml").click(function () {
        generated = "<textarea rows='17' cols='50'><p>";
        getFormData();
        generated += "</textarea>";
        $("#generatedHTML").html(generated);
    });

    $("#city").focus(function () {
        victimform = " ";
        getFormData();
        var i = peopleKilled;
        for (i; i > 0; i--) {
            victimform += "<form>Victim Name:<br><input type='text' id='victimName' name='victimName'><br>Victim Age:<br><input type='number' id='victimAge' name='victimAge'><br>Victim Hometown:<br><input type='text' id='victimHome' name='victimHome'></form>";
        }
        $("#victimHTML").html(victimform);
    });
});
