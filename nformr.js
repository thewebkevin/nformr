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
var generated;
var killedForm = "";
var injuredForm = "";
var time;
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var peopleKillednum;
var peopleInjurednum;
var timeDescription;
var timehour;
var killedVictims = [];
var injuredVictims = [];
var killedVictim = {};
var injuredVictim = {};
var killedID;
var injuredID;
var peopleKilledInt;
var peopleInjuredInt;
var kWasWere;
var kNotId;
var iNotId;
var iWasWere;
var x;
var y;
var tfStreetAddress;
var tfCity;
var kIdAddAnd;
var iIdAddAnd;
var headline;
var killedHeadline;
var injuredHeadline;
var headlineHTML;
var image;
var imageLink;

//Reads user input and converts form  data to variables
function getFormData() {
    "use strict";
    peopleKilled = document.getElementById('peopleKilled').value;
    peopleInjured = document.getElementById('peopleInjured').value;
    city = document.getElementById('city').value;
    state = document.getElementById('state').value;
    crime = document.getElementById('crime').value.toLowerCase();
    streetAddress = document.getElementById('streetAddress').value;
    lawLong = document.getElementById('lawLong').value;
    time = document.getElementById("date").value;
    peopleKilledInt = parseInt(peopleKilled, "10");
    peopleInjuredInt = parseInt(peopleInjured, "10");
}
//These 2 functions cycle over identified victims and pushes the form data to Javascript Objects in an Array
function pushKilled() {
    "use strict";
    var i = 1;
    for (i; i < (peopleKilledInt + 1); i += 1) {
        killedVictim = {
            firstName: document.getElementById("killedFName" + i).value,
            lastName: document.getElementById("killedLName" + i).value,
            age: document.getElementById("killedAge" + i).value,
            fullName: document.getElementById("killedFName" + i).value + " " + document.getElementById("killedLName" + i).value
        };
        if (killedVictim.firstName !== "" || killedVictim.lastName !== "" || killedVictim.age !== "") {
            killedVictims.push(killedVictim);
        }
    }
}

function pushInjured() {
    "use strict";
    var i = 1;
    for (i; i < (peopleInjuredInt + 1); i += 1) {
        injuredVictim = {
            firstName: document.getElementById("injuredFName" + i).value,
            lastName: document.getElementById("injuredLName" + i).value,
            age: document.getElementById("injuredAge" + i).value,
            fullName: document.getElementById("injuredFName" + i).value + " " + document.getElementById("injuredLName" + i).value
        };
        if (injuredVictim.firstName !== "" || injuredVictim.lastName !== "" || injuredVictim.age !== "") {
            injuredVictims.push(injuredVictim);
        }
    }
}

//Cycles over pushed Javascript objects in victms arrays and to create strings
function identify() {
    "use strict";
    killedVictims = [];
    injuredVictims = [];
    pushInjured();
    pushKilled();
    killedID = "";
    injuredID = "";
    x = 0;
    y = 0;

    for (x; x < killedVictims.length; x += 1) {
        killedID += killedVictims[x].fullName + ", " + killedVictims[x].age + ", ";
        if (x === (killedVictims.length - 2) && killedVictims.length > 1) {
            killedID += "and ";
        }
    }

    for (y; y < injuredVictims.length; y += 1) {
        injuredID += injuredVictims[y].fullName + ", " + injuredVictims[y].age + ", ";
        if (y === (injuredVictims.length - 2) && injuredVictims.length > 1) {
            injuredID += "and ";
        }
    }
}

//Uses data gathered by getFormData() and parses that information to other variables
function translate() {
    "use strict";
    cityAPI = city.replace(" ", "+");
    addressAPI = streetAddress.replace(" ", "+");
    googleMapUrl = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&markers=" + streetAddress + "+" + city + "+" +
        state + "&key=" + keyAPI;
    tfKilled = false;
    tfInjured = false;
    killed = " ";
    injured = " ";
    killedHeadline = "";
    injuredHeadline = "";
    kIdAddAnd = "";
    iIdAddAnd = "";
    time = new Date(time);
    day = days[time.getDay()];
    peopleInjurednum = peopleInjured;
    peopleKillednum = peopleKilled;
    timehour = time.toTimeString();

    kNotId = peopleKilledInt - killedVictims.length;
    iNotId = peopleInjuredInt - injuredVictims.length;

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

    if (peopleKillednum < 10) {
        peopleKillednum = numbers[peopleKillednum];
    }
    if (peopleInjurednum < 10) {
        peopleInjurednum = numbers[peopleInjurednum];
    }

    if (tfKilled) {
        killed = peopleKillednum + killedTense + " killed ";
        killedHeadline = peopleKillednum + " killed ";
    }

    if (tfInjured && tfKilled) {
        addAnd = " and ";
    } else {
        addAnd = " ";
    }

    if (tfInjured) {
        injured = peopleInjurednum + injuredTense + " injured ";
        injuredHeadline = peopleInjurednum + " injured ";
    }

    if (peopleKilledInt > 1) {
        kWasWere = " were killed ";
    } else {
        kWasWere = " was killed ";
    }

    if (peopleInjuredInt > 1) {
        iWasWere = " were injured ";
    } else {
        iWasWere = " was injured ";
    }

    if (peopleKilledInt === 0) {
        kWasWere = "";
    }

    if (peopleInjuredInt === 0) {
        iWasWere = "";
    }

    if (killedVictims.length > 0 && kNotId > 0) {
        kIdAddAnd = " and ";
    }

    if (injuredVictims.length > 0 && iNotId > 0) {
        iIdAddAnd = " and ";
    }

    if (kNotId > 1) {
        kNotId = kNotId + " people ";
    }
    if (kNotId === 1) {
        kNotId = kNotId + " person ";
    }
    if (kNotId <= 0) {
        kNotId = "";
    }

    if (iNotId > 1) {
        iNotId = iNotId + " people ";
    }
    if (iNotId === 1) {
        iNotId = iNotId + " person ";
    }
    if (iNotId <= 0) {
        iNotId = "";
    }

    if (streetAddress === "") {
        tfStreetAddress = "";
    } else {
        tfStreetAddress = " at " + streetAddress + " ";
    }

    if (city === "") {
        tfCity = "";
    } else {
        tfCity = " in " + city + " ";
    }

    if ((time.getHours() + 5) < 12) {
        timeDescription = " morning ";
    } else {
        timeDescription = " afternoon ";
    }

    if (lawLong.indexOf("Police") > -1) {
        lawShort = "Police";
    } else if (lawLong.indexOf("Sheriff's") > -1) {
        lawShort = "Deputies";
    } else {
        lawShort = "Officials";
    }

    if (crime === "shooting") {
        imageLink = "http://www.wbrz.com/images/news/ShootingCrime.jpg";
    } else if (crime === "stabbing") {
        imageLink = "http://www.wbrz.com/images/news/FORTDRUMSTABBING.jpg";
    }

    crime = crime + " ";
}

function generateProduct() {
    "use strict";

    if (peopleKilled > 0 || peopleInjured > 0) {
        headline += "<h1>" + lawShort + ": " + killedHeadline + injuredHeadline + " in " + timeDescription + city + " " + crime + "</h1>";
        headlineHTML = lawShort + ": " + killedHeadline + injuredHeadline + "in" + timeDescription + city + " " + crime;
    } else {
        headline += "<h1>" + lawShort + " investigating " + timeDescription + crime + tfCity + "</h1>";
        headlineHTML = lawShort + " investigating" + timeDescription + crime + tfCity;
    }

    image = "<img id='imageprev' src='" + imageLink + "'>";

    generated += "<p>";
    generated += city.toUpperCase() + " - ";

    if (peopleKilled > 0 || peopleInjured > 0) {
        generated += lawShort + " say " + killed + addAnd + injured + " in a " + crime + tfCity + day + timeDescription + ".</p>";
        if (killedVictims.length > 0 || injuredVictims.length > 0) {
            generated += "<p>According to the " + lawLong + ", " + killedID + kIdAddAnd + kNotId + kWasWere + addAnd + injuredID + iIdAddAnd + iNotId + iWasWere + " in a " + crime + tfStreetAddress + tfCity + day + ".</p>";
        } else {
            generated += "<p>According to the " + lawLong + ", " + killed + addAnd + injured + " in a " + crime + tfStreetAddress + tfCity + day + ".</p>";
        }
    } else {
        generated += lawShort + " are investigating a " + crime + tfCity + day + timeDescription + ".</p>";
        generated += "<p>The " + lawLong + " is currently investigating a " + crime + tfStreetAddress + tfCity + day + ".</p>";
    }

    generated += "<p>This is a developing story. Stay tuned to <a href ='http://www.wbrz.com/'>WBRZ News 2</a> on <a href ='https://www.facebook.com/WBRZNews2'>Facebook</a> and <a href ='https://twitter.com/wbrz'>Twitter</a> for the lastest updates as they become available.</p>";

    if ($('#mapCheck').is(':checked')) {
        generated += "<img src='" + googleMapUrl + "'>";
    }

    if ($('#twitterCheck').is(':checked')) {

        generated += "<br>";
        generated += '<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/WBRZ" data-widget-id="643930502164930560">Tweets by @WBRZ</a>';
        generated += '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?';
        generated += "'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+";
        generated += '"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';
    }

}

$(function () {
    "use strict";
    $("#generateButton").click(function () {
        generated = "";
        headline = "";
        getFormData();
        identify();
        translate();
        generateProduct();
        $("#generatedHTML").html(headline + image + generated);

    });

    $("#generateHtml").click(function () {

        //'<input type="text" id="headline" name="headline" value ="' + headlineHTML + '">';

        generated = "<br><textarea rows='17' cols='50'>";
        getFormData();
        identify();
        translate();
        generateProduct();
        headlineHTML = "<br><input type='text' id='headline' size='48.5' name='headline' value='" + headlineHTML + "'><br>";
        image = "<br><input type='text' id='headline' size='48.5' name='headline' value='" + imageLink + "'><br>";
        generated += "</textarea>";
        $("#generatedHTML").html(headlineHTML + image + generated);
    });

    $("#peopleKilled").blur(function () {
        killedForm = " ";
        getFormData();
        var i = peopleKilled,
            counter = 0;
        for (i; i > 0; i -= 1) {
            counter += 1;
            killedForm += "<p>Killed " + counter + ":</p><form>Name:<br><input type='text' id='killedFName" + counter + "' name='killedFName" + counter + "' placeholder='First Name'><input type='text' id='killedLName" + counter + "' name='killedLName" + counter + "' placeholder='Last Name'><br>Age:<br><input type='number' id='killedAge" + counter + "' name='killedAge" + counter + "'><br></form>";
        }
        $("#killedHTML").html(killedForm);
    });


    $("#peopleInjured").blur(function () {
        injuredForm = " ";
        getFormData();
        var i = peopleInjured,
            counter = 0;
        for (i; i > 0; i -= 1) {
            counter += 1;
            injuredForm += "<p>Injured " + counter + ":</p><form>Name:<br><input type='text' id='injuredFName" + counter + "' name='injuredFName" + counter + "' placeholder='First Name'><input type='text' id='injuredLName" + counter + "' name='injuredLName" + counter + "' placeholder='Last Name'><br>Age:<br><input type='number' id='injuredAge" + counter + "' name='injuredAge" + counter + "'><br></form>";
        }
        $("#injuredHTML").html(injuredForm);
    });
});
