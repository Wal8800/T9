//console.log("hello");
//lat: -36.8498
//long: 174.7650

var lat = "";
var lng = "";
var apiKey = "833ef094-eb58-4f6e-812f-ae9b37b45719";
var urllocation = "Queen Street";
var parkingLocations = "";

(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
})();

$("#atButton").on("click", function () {

    //$.when(
    //    jQuery.ajax({
    //    url: "https://api.at.govt.nz/v1/gtfs/routes/geosearch?lat=" + lat + "&lng=" + lng + "&distance=200&api_key=" + apiKey,
    //        type: "GET",

    //        contentType: 'application/json; charset=utf-8',
    //        success: function (resultData) {
    //            //here is your json.
    //            // process it

    //            // return result
    //            console.log("routes/search radius");
    //            var result = resultData.response;
    //            console.log(result);
    //        },
    //        error: function (jqXHR, textStatus, errorThrown) {
    //            console.log("fail");
    //        }
    //    }),
    //    jQuery.ajax({
    //        url: "https://api.at.govt.nz/v1/gtfs/stops/geosearch?lat=" + "-36.910188" + "&lng=" + "174.745447" + "&distance=500&api_key=" + apiKey,
    //        type: "GET",

    //        contentType: 'application/json; charset=utf-8',
    //        success: function (resultData) {
    //            //here is your json.
    //            // process it

    //            // return result
    //            console.log("stop places");
    //            var result = resultData.response;

    //            console.log(result);
    //        },
    //        error: function (jqXHR, textStatus, errorThrown) {
    //            console.log("fail");
    //        }
    //    })
    //).then(function () {
    //    console.log("routes search by stop id");

    //    $.when(
    //        jQuery.ajax({
    //            url: "https://api.at.govt.nz/v1/gtfs/stops/geosearch?lat=" + "-36.910188" + "&lng=" + "174.745447" + "&distance=500&api_key=" + apiKey,
    //            type: "GET",

    //            contentType: 'application/json; charset=utf-8',
    //            success: function (resultData) {
    //                //here is your json.
    //                // process it

    //                // return result
    //                console.log("stop places");
    //                var result = resultData.response;

    //                console.log(result);
    //            },
    //            error: function (jqXHR, textStatus, errorThrown) {
    //                console.log("fail");
    //            }
    //        })
    //    ).then(function () {

    //    });

    //});

    $.when(

        jQuery.ajax({
            url: "https://api.at.govt.nz/v1/public/display/parkinglocations?callback=" + urllocation.replace(" ", "%20") + "&api_key=" + apiKey,
            type: "GET",

            contentType: 'application/json; charset=utf-8',
            success: function (resultData) {
                //here is your json.
                // process it

                // return result
                console.log("routes/search radius");
                //debugger;
                var result = resultData;
                var strlength = result.length;
                var strindex = result.indexOf("{\"status\":");
                var substr = result.substring(strindex, strlength-2);
                var jsonObject = JSON.parse(substr);
                parkingLocations = jsonObject.response;
                console.log(jsonObject);
                //console.log(resultData);
                //console.log(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("fail");
            }
        })
    ).then(function () {
        debugger;
        console.log(parkingLocations);
    });

});