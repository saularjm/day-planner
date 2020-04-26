 $(document).ready(function() {

    // Get current day and display in header
    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay);

    // Time format
    var currentHour = moment().format("H");

    // Get any saved events from localStorage
    var storedEvents = JSON.parse(localStorage.getItem("storedEvents"));

    // Populate with stored events, if any
    if (storedEvents !== null) {
        eventArr = storedEvents;
    }
    // Else, create array for event storage
    else {
        eventArr = new Array(9);
    }

    // Grab container div and reset
    var planner = $("#plannerContainer");
    planner.empty();

    // Build day calendar
    for (var hr = 9; hr <= 17; hr++) {
        var arrIndex = hr - 9;

        // Build row divs
        var rowDiv = $("<div>");
        rowDiv.addClass("time-block");
        rowDiv.addClass("row");
        rowDiv.attr("hour", hr);

        // Build time box
        var timeBoxDiv = $("<div>");
        timeBoxDiv.addClass("col-2");
        timeBoxDiv.addClass("hour");

        // Format time
        var timeDisplay = 0;
        var amOrPm = "";

        if (hr > 12) {
            timeDisplay = hr - 12;
            amOrPm = "pm";
        }
        else if (hr === 12) {
            timeDisplay = hr;
            amOrPm = "pm";
        }
        else {
            timeDisplay = hr;
            amOrPm = "am";
        }

        // Set time text, append time box to row
        timeBoxDiv.text(timeDisplay + amOrPm);
        rowDiv.append(timeBoxDiv);

        // Build event input box
        var inputDiv = $("<input>");
        inputDiv.addClass("col-9");
        inputDiv.attr("id", "input-" + arrIndex);
        inputDiv.attr("type", "text");

        // Set hour
        inputDiv.val(eventArr[arrIndex]);

        // Append input to row
        rowDiv.append(inputDiv);

        // Build save button
        var saveBtn = $("<button>");
        saveBtn.attr("saveId", arrIndex);
        saveBtn.addClass("fa fa-save");
        saveBtn.addClass("saveBtn");
        saveBtn.addClass("col-1");

        // Append to row
        rowDiv.append(saveBtn);

        // Change row color depending on time
        if (hr < currentHour) {
            inputDiv.addClass("past");
        }
        else if (hr > currentHour) {
            inputDiv.addClass("future");
        }
        else {
            inputDiv.addClass("present");
        }

        // Append rows to container
        planner.append(rowDiv);
    }

    // Save button function
    $("button").on("click", function(event) {
        event.preventDefault();

        // Match id's of saveBtn and inputDiv
        var saveIndex = $(this).attr("saveId");
        var inputId = "#input-" + saveIndex;
        var inputValue = $(inputId).val();

        // Store input value in array
        eventArr[saveIndex] = inputValue;

        // Store array in localStorage
        localStorage.setItem("storedEvents", JSON.stringify(eventArr));
    })
 })