//console.log("hello");
//lat: -36.8498
//long: 174.7650
//roskill
var lat = "";
var lng = "";
var apiKey = "833ef094-eb58-4f6e-812f-ae9b37b45719";
var parkingLocations = "";
var routeLocations = [];
var startStops = [];
var endStops = [];
var trips = [];

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
            url: "https://api.at.govt.nz/v1/public/display/parkinglocations?callback=" + $("#query").val().replace(" ", "%20") + "&api_key=" + apiKey,
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
                var substr = result.substring(strindex, strlength - 2);
                var jsonObject = JSON.parse(substr);
                parkingLocations = jsonObject.response;
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
        parkingLocations = parkingLocations.filter(function (value) {
            if (value.id <= 20) {
                return true;
            } else {
                return false;
            }
        });
        console.log(parkingLocations);
    });

});

$("#busButton").on("click", function () {
    $.when(
        jQuery.ajax({
            url: "https://api.at.govt.nz/v1/gtfs/routes/search/" + "newmarket" + "?api_key=" + apiKey,
            type: "GET",

            contentType: 'application/json; charset=utf-8',
            success: function (resultData) {
                //here is your json.
                // process it

                // return result
                console.log("Routes by search");
                //debugger;
                var result = resultData.response;
                result.forEach(function (element) {
                    routeLocations.push(element.route_id);
                });
                console.log(routeLocations);
                //console.log(resultData);
                //console.log(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("fail");
            }
        }),
        jQuery.ajax({
            url: "https://api.at.govt.nz/v1/gtfs/stops/search/" + "roskill" + "?api_key=" + apiKey,
            type: "GET",

            contentType: 'application/json; charset=utf-8',
            success: function (resultData) {
                //here is your json.
                // process it

                // return result
                console.log("Stops by search");
                //debugger;
                var result = resultData.response;
                result.forEach(function (element) {
                    startStops.push(element.stop_id);
                });
                console.log(startStops);
                //console.log(resultData);
                //console.log(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("fail");
            }
        }),
        jQuery.ajax({
            url: "https://api.at.govt.nz/v1/gtfs/stops/search/" + "newmarket" + "?api_key=" + apiKey,
            type: "GET",

            contentType: 'application/json; charset=utf-8',
            success: function (resultData) {
                //here is your json.
                // process it

                // return result
                console.log("Stops by search");
                //debugger;
                var result = resultData.response;
                result.forEach(function (element) {
                    endStops.push(element.stop_id);
                });
                console.log(endStops);
                //console.log(resultData);
                //console.log(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("fail");
            }
        })


    ).then(function () {
        $.when(
            jQuery.ajax({
                url: "https://api.at.govt.nz/v1/gtfs/trips/routeid/" + routeLocations[0] + "?api_key=" + apiKey,
                type: "GET",

                contentType: 'application/json; charset=utf-8',
                success: function (resultData) {
                    //here is your json.
                    // process it

                    // return result
                    console.log("Trip of first routes");
                    //debugger;
                    var result = resultData.response;
                    var seen = [];
                    result.forEach(function (element) {
                        if (seen.indexOf(element.trip_id) == -1) {
                            trips.push(element.trip_id);
                            seen.push(element.trip_id);
                        }
                    });
                    console.log(trips);
                    //console.log(resultData);
                    //console.log(result);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("fail");
                }
            })
        ).then(function () {
            $.when(
                jQuery.ajax({
                    url: "https://api.at.govt.nz/v1/gtfs/stopTimes/tripId/" + trips[0] + "?api_key=" + apiKey,
                    type: "GET",

                    contentType: 'application/json; charset=utf-8',
                    success: function (resultData) {
                        //here is your json.
                        // process it

                        // return result
                        console.log("All stops in that trip");
                        //debugger;
                        var result = resultData.response;
                        var stopIds = [];
                        result.forEach(function (element) {
                            stopIds.push(element.stop_id);
                        });
                        console.log(stopIds);

                        stopIds.forEach(function (element) {
                            if (startStops.indexOf(element) != -1 || endStops.indexOf(element) != -1) {
                                console.log(element);
                            }
                        });

                        //console.log(resultData);
                        //console.log(result);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("fail");
                    }
                })
            ).then(function () {

            });
        });
    });
});