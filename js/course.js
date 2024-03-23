function addCourse() {
  const courseName = document.getElementById("course-name").value.trim();
  const timeSlot = document.getElementById("time-slot").value;
  const daysChecked = document.querySelectorAll('input[name="day"]:checked');

  if (courseName === "") {
    alert("Please enter a course name.");
    return;
  }

  if (daysChecked.length === 0) {
    alert("Please select at least one day.");
    return;
  }

  const scheduleTable = document.querySelector(".schedule-table");
  const rows = scheduleTable.getElementsByTagName("tr");

  // Map time slots to row indexes
  const timeSlotToRowIndex = {
    "08:00-09:15": 1,
    "09:30-10:45": 2,
    "12:00-13:15": 3,
    "13:30-14:45": 4,
    "15:00-16:15": 5,
    "16:30-17:45": 6,
    "18:15-19:30": 7,
    "19:45-21:00": 8,
  };

  daysChecked.forEach((day) => {
    const dayValue = day.value;
    const rowIndex = timeSlotToRowIndex[timeSlot];
    const columnIndex = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
    }[dayValue];

    const cell = rows[rowIndex].cells[columnIndex];
    cell.textContent = cell.textContent
      ? `${cell.textContent}, ${courseName}`
      : courseName;
  });

  // Clear the form
  document.getElementById("course-name").value = "";
  daysChecked.forEach((day) => (day.checked = false));
}
function resetSchedule() {
  const scheduleTable = document.querySelector(".schedule-table");
  for (let i = 1, row; (row = scheduleTable.rows[i]); i++) {
    for (let j = 1, col; (col = row.cells[j]); j++) {
      col.innerHTML = "";
    }
  }
}
function createSchedule() {
  const scheduleTable = document.querySelector(".schedule-table");
  localStorage.setItem("schedule", scheduleTable.innerHTML);
  window.location.href = "view-schedule.html"; // Redirect to the view page
}
