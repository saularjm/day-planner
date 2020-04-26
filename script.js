$(document).ready(function() {

    // Get current day and display in header
    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay);

    // Get any saved events from localStorage
    var storedEvents = JSON.parse(localStorage.getItem("storedEvents"));

    if (storedEvents !== null) {
        eventArr = storedEvents;
    }
    else {
        eventArr = new Array(9);
    }

    // Grab container div and reset
    var planner = $("#plannerContainer");
    planner.empty();

    // Build day calendar
    for (var hr = 9; hr = 17; hr++) {
        var arrIndex = hr - 9;

        // Build row divs
        var rowDiv = $("<div>");
        rowDiv.addClass("time-block");
        rowDiv.addClass("row");
        rowDiv.attr("hour", hr);

        // Build time box
        var timeBoxDiv = $("<div>");
        timeBoxDiv.addClass("col-2");

        var timeBoxSpan = $("<span>");
        timeBoxSpan.addClass("hour");

        // Format time
        var timeDisplay = 0;
        var amOrPm = "";

        if (hr > 12) {
            timeDisplay = hr - 12;
            amOrPm = "pm";
        }
        else {
            timeDisplay = hr;
            amOrPm = "am";
        }

        timeBoxSpan.text(timeDisplay + amOrPm);
        rowDiv.append(timeBoxDiv);
        timeBoxDiv.append(timeBoxSpan);


    }



})