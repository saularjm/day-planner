 $(document).ready(function() {

    // Get current day and display in header
    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay);

    // Time format
    var currentHour = moment().format("H");

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
        else {
            timeDisplay = hr;
            amOrPm = "am";
        }

        // Put time text in span, append time box to row
        timeBoxDiv.text(timeDisplay + amOrPm);
        rowDiv.append(timeBoxDiv);

        // Build event box
        // var eventSpan = $("<input>");
        // eventSpan.attr("id", "input-" + arrIndex);
        // eventSpan.attr("hour", arrIndex);
        // eventSpan.attr("type", "text");
        
        

        // Build event box
        var inputDiv = $("<input>");
        inputDiv.addClass("col-9");
        inputDiv.attr("id", "input-" + arrIndex);
        inputDiv.attr("hour", arrIndex);
        inputDiv.attr("type", "text");

        // Set hour
        inputDiv.val(eventArr[arrIndex]);

        // Append input to row
        rowDiv.append(inputDiv);
        //inputDiv.append(eventSpan);

        // Build save button
        var saveBtn = $("<button>");
        saveBtn.attr("id", "saveId-" + arrIndex);
        saveBtn.attr("save", arrIndex);
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

        planner.append(rowDiv);
    }

    // Save button function
    $("button").on("click", function(event) {
        event.preventDefault();

        var saveIndex = $(this).attr("save");
        var inputId = "#input-" + saveIndex;
        var inputValue = $(inputId).val();

        eventArr[saveIndex] = inputValue;

        localStorage.setItem("storedEvents", JSON.stringify(eventArr));
    })
 })