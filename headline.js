"use strict";
window.addEventListener("DOMContentLoaded", init);

function init() {
  getHeadline();
}
let typing = document.querySelector(".string-placeholder").textContent;
let typingP = document.querySelector(".string-placeholder");
let typingLength = typing.length;
const stringArray = ["løb i Danmark!", "odds!", "store puljer!"];
let arrayCnt = 0;

function getHeadline() {
  document.querySelector(".string-placeholder").classList.add("typing");
  document.querySelector(".string-placeholder").textContent = stringArray[0];
  typingP.style.setProperty("--string_l", 21);

  setInterval(startH1Array, 5000);
}

function startH1Array() {
  typingP.style.setProperty("--string_l", 0);
  arrayCnt = (arrayCnt + 1) % (stringArray.length + 1);
  if (arrayCnt == stringArray.length) {
    arrayCnt = 0;
  }
  typingLength = stringArray[arrayCnt].length;
  document.querySelector(".string-placeholder").textContent = stringArray[arrayCnt];
  setTimeout(function() {
    typingP.style.setProperty("--string_l", typingLength + 1);
  }, 800);
}
