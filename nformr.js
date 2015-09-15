$(function () {
    $("button").click(function () {

        var peopleKilled = document.getElementById('peopleKilled').value;
        var peopleInjured = document.getElementById('peopleInjured').value;
        var city = document.getElementById('city').value;
        var cityAPI = city.replace(" ", "+");
        var state = document.getElementById('state').value;
        var crime = document.getElementById('crime').value.toLowerCase();
        var streetAddress = document.getElementById('streetAddress').value;
        var addressAPI = streetAddress.replace(" ", "+");
        var lawLong = document.getElementById('lawLong').value;
        var lawShort;
        var day = document.getElementById('day').value;
        var injured = " ";
        var killed = " ";
        var tfKilled;
        var tfInjured;
        var killedTense;
        var injuredTense;
        var addAnd;
        var keyAPI = "AIzaSyANnAoaacT1T4QC7Kd9W6e9muA2CZb9FIM";
        var googleMapUrl = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&markers=" + streetAddress + "+" + city + "+"
        state + "&key=" + keyAPI;

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

        var generated = "<p>";
        generated += city.toUpperCase() + " - ";
        generated += lawShort + " say " + killed + addAnd + injured + " in a " + crime + " in " + city + " " + day + ".</p>";
        generated += "<p>According to the " + lawLong + ", " + killed + addAnd + injured + " in a " + crime + " at " + streetAddress + " in " + city + " " + day + ". </p>"
        generated += "<p>This is a developing story. Stay tuned to <a href ='http://www.wbrz.com/'>WBRZ News 2</a> on <a href ='https://www.facebook.com/WBRZNews2'>Facebook</a> and <a href ='https://twitter.com/wbrz'>Twitter</a> for the lastest updates as they become available.</p>";

        if ($('#mapCheck').is(':checked')) {
            generated += "<img src='" + googleMapUrl + "'>";
        }
        $("#generatedHTML").html(generated);
    });
});
