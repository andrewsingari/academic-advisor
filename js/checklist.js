// Function to update total hours for all sections
function updateTotalHours() {
  const coreTotal = calculateTotalHours("core-requirements");
  document.getElementById("core-total-hours").textContent = coreTotal;

  // Do the same for other sections and then add them up
  // ...

  const allSectionsTotal = coreTotal;
  document.getElementById("all-sections-total-hours").textContent =
    allSectionsTotal;
}

// Bind the updateTotalHours function to input events on hour inputs
window.onload = function () {
  const hourInputs = document.querySelectorAll(".semester-hours-input");
  hourInputs.forEach((input) => {
    input.addEventListener("input", updateTotalHours);
  });
};
function calculateTotalHours() {
  const coreHoursInputs = document.querySelectorAll(
    "#core-requirements .semester-hours-input"
  );
  const requiredHoursInputs = document.querySelectorAll(
    "#required-courses .semester-hours-input"
  );
  const ancillaryHoursInputs = document.querySelectorAll(
    "#ancilliary-requirements .semester-hours-input"
  );
  const electiveHoursInputs = document.querySelectorAll(
    "#elective-courses .semester-hours-input"
  );

  let totalHours = 0;

  // Helper function to sum the values of number inputs
  const sumInputValues = (inputs) => {
    return Array.from(inputs).reduce((total, input) => {
      return total + (parseInt(input.value) || 0);
    }, 0);
  };

  // Sum hours from all sections
  totalHours += sumInputValues(coreHoursInputs);
  totalHours += sumInputValues(requiredHoursInputs);
  totalHours += sumInputValues(ancillaryHoursInputs);
  totalHours += sumInputValues(electiveHoursInputs);

  // Display the total hours
  document.getElementById(
    "all-sections-total-hours"
  ).textContent = `${totalHours} out of 122`;

  // Update total hours for each section (optional)
  document.getElementById("core-total-hours").textContent =
    sumInputValues(coreHoursInputs);
  document.getElementById("required-total-hours").textContent =
    sumInputValues(requiredHoursInputs);
  document.getElementById("ancillary-total-hours").textContent =
    sumInputValues(ancillaryHoursInputs);
  document.getElementById("elective-total-hours").textContent =
    sumInputValues(electiveHoursInputs);
}

// Event listener for the calculate button
document
  .getElementById("calculate-hours")
  .addEventListener("click", calculateTotalHours);
