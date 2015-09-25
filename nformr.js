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
    time = new Date(time);
    day = days[time.getDay()];
    peopleInjurednum = peopleInjured;
    peopleKillednum = peopleKilled;
    timehour = time.toTimeString();
    peopleKilledInt = parseInt(peopleKilled, "10");
    peopleInjuredInt = parseInt(peopleInjured, "10");

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

    if (tfKilled) {
        killed = peopleKillednum + killedTense + " killed ";
    }

    if (tfInjured && tfKilled) {
        addAnd = " and ";
    } else {
        addAnd = " ";
    }

    if (tfInjured) {
        injured = peopleInjurednum + injuredTense + " injured ";
    }

    if (peopleKillednum < 10) {
        peopleKillednum = numbers[peopleKillednum];
    }
    if (peopleInjurednum < 10) {
        peopleInjurednum = numbers[peopleInjurednum];
    }

    if (killedVictims.length > 1) {
        kWasWere = " were killed ";
    } else {
        kWasWere = " was killed ";
    }

    if (injuredVictims.length > 1) {
        iWasWere = " were injured ";
    } else {
        iWasWere = " was injured ";
    }

    if (killedVictims.length === 0) {
        kWasWere = "";
    }

    if (injuredVictims.length === 0) {
        iWasWere = "";
    }

    if ((time.getHours() + 5) < 12) {
        timeDescription = "morning";
    } else {
        timeDescription = "afternoon";
    }

    if (lawLong.indexOf("Police") > -1) {
        lawShort = "Police";
    }
    if (lawLong.indexOf("Sheriff's") > -1) {
        lawShort = "Deputies";
    }
}

function generateProduct() {
    "use strict";
    generated += city.toUpperCase() + " - ";
    if (peopleKilled > 0 || peopleInjured > 0) {
        generated += lawShort + " say " + killed + addAnd + injured + " in a " + crime + " in " + city + " " + day + " " + timeDescription + ".</p>";
        if (killedVictims.length > 0 || injuredVictims.length > 0) {
            generated += "<p>According to the " + lawLong + ", " + killedID + kWasWere + addAnd + injuredID + iWasWere + " in a " + crime + " at " + streetAddress + " in " + city + " " + day + ".</p>";
        } else {
            generated += "<p>According to the " + lawLong + ", " + killed + addAnd + injured + " in a " + crime + " at " + streetAddress + " in " + city + " " + day + ".</p>";
        }
    } else {
        generated += lawShort + " are investigating a " + crime + " in " + city + " " + day + " " + timeDescription + ".</p>";
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
        identify();
        translate();
        generateProduct();
        $("#generatedHTML").html(generated);

    });

    $("#generateHtml").click(function () {
        generated = "<textarea rows='17' cols='50'><p>";
        getFormData();
        identify();
        translate();
        generateProduct();
        generated += "</textarea>";
        $("#generatedHTML").html(generated);
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
