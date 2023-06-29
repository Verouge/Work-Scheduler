$(function () {
  // Display the current date at the top of the calendar
  const currentDate = dayjs().format("MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // Generate time blocks from 9am to 5pm
  const startTime = 9; // Start time (9am)
  const endTime = 17; // End time (5pm)

  for (let hour = startTime; hour <= endTime; hour++) {
    const timeBlockId = "hour-" + hour;

    const $timeBlock = $("<div>")
      .attr("id", timeBlockId)
      .addClass("row time-block");

    const amPm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    const $hourDiv = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(displayHour + amPm);

    const $descriptionTextarea = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("rows", "3");

    const $saveButton = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save");
    const $saveIcon = $("<i>")
      .addClass("fas fa-save")
      .attr("aria-hidden", "true");

    $saveButton.append($saveIcon);

    $timeBlock.append($hourDiv, $descriptionTextarea, $saveButton);
    $(".container-fluid").append($timeBlock);
  }

  // Add click event listener to the save buttons
  $(".saveBtn").on("click", function () {
    const $timeBlock = $(this).closest(".time-block");
    const timeBlockId = $timeBlock.attr("id");
    const description = $timeBlock.find(".description").val();
    localStorage.setItem(timeBlockId, description);

    const $confirmationMessage = $("<p>")
      .text("Appointment added to Local Storage")
      .addClass("confirmation-message");

    $("header").append($confirmationMessage);

    setTimeout(function () {
      $confirmationMessage.remove();
    }, 1000);
  });

  // Load saved events from local storage and set the values of the corresponding textarea elements
  $(".time-block").each(function () {
    const timeBlockId = $(this).attr("id");
    const description = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(description);
  });

  // Add "past," "present," or "future" class to each time block
  const currentHour = dayjs().hour();
  $(".time-block").each(function () {
    const timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    if (timeBlockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
});
