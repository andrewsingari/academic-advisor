function toggleDropdown(dropdownId) {
  var element = document.getElementById(dropdownId);
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}
