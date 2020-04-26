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

    



})