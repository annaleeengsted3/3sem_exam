"use strict";
let currentTab = 0;
showTab(currentTab);

function showTab(tabs) {
  // This function will display the specified tab of the form
  let x = document.querySelectorAll(".tab");
  x[tabs].style.display = "block";

  if (tabs == 0) {
    document.querySelector("#prevBtn").style.display = "none";
    document.querySelector("#sendBtn").style.display = "none";
  } else {
    document.querySelector("#prevBtn").style.display = "inline";
    document.querySelector("#logIn").style.display = "none";
    document.querySelector(".existinguser").style.display = "none";
    document.querySelector("#sendBtn").style.display = "none";
  }
  if (tabs == x.length - 2) {
    document.querySelector("#nextBtn").style.display = "none";
    document.querySelector("#sendBtn").style.display = "inline";
  } else {
    document.querySelector("#nextBtn").innerHTML = "Videre";
  }
  if (tabs == x.length - 1) {
    document.querySelector("#nextBtn").innerHTML = "Luk";
    document.querySelector("#prevBtn").style.display = "none";
  }

  activeStep(tabs);
}

function nextPrev(tabs) {
  // This function displays the correct "tab" depending on which button you click.
  let x = document.querySelectorAll(".tab");

  if (tabs == 1 && !validateForm()) return false;

  x[currentTab].style.display = "none";

  currentTab = currentTab + tabs;

  if (currentTab >= x.length) {
    document.querySelector("#regForm").submit();
    return false;
  }

  showTab(currentTab);
}
// VALIDATION - Checks the input fields, if they are empty it will return false.

function validateForm() {
  let tab,
    input,
    i,
    valid = true;
  tab = document.querySelectorAll(".tab");
  input = tab[currentTab].getElementsByTagName("input");

  for (i = 0; i < input.length; i++) {
    if (input[i].value == "") {
      input[i].className += " invalid";

      valid = false;
    }
  }

  if (valid) {
    document.querySelectorAll(".step")[currentTab].className += " finish";
  }

  return valid;
}

function activeStep(tabs) {
  let i,
    x = document.querySelectorAll(".step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }

  x[tabs].className += " active";
}
