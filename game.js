"use strict";
console.log("runnin");
window.addEventListener("DOMContentLoaded", init);

const horse = document.querySelector("#horse");
const fence = document.querySelector("#fence");

function init() {
  moveFence();
  isCollided();
}

const speed = 19; //vw per s
let last;
let pos = 0;

function moveFence() {
  const now = performance.now();

  const delta = now - last || 0;

  last = now;

  pos += speed / (1000 / delta);
  if (pos > 110) {
    pos = 0;
  }
  fence.style.transform = `translateX(-${pos}vw)`;

  requestAnimationFrame(moveFence);
}

document.onkeydown = checkKey;
document.onkeyup = resetAnimation;

let xPos = 0;
let yPos = 150;
let keys = {
  right: false,
  space: false
};

function checkKey(e) {
  e = e || window.event;

  //console.log(window.event);

  if (e.keyCode == "39") {
    // right arrow
    //keys.right = true;
    xPos += 20;
    horse.style.left = `${xPos}px`;
  } else if (e.keyCode == "32") {
    //space
    //keys.space = true;
    horse.classList.add("jump");
  }
}

function resetAnimation() {
  horse.classList.remove("jump");
}

function isCollided() {
  //const horsePos = document.querySelector("#horse circle");
  const horsePos = document.querySelector("#horse circle").getBoundingClientRect();
  //console.log(horsePos);

  const fencePos = document.querySelector("#fence circle").getBoundingClientRect();

  //const dist = Math.hypot(horseX - fenceX, horseY - fenceY);
  //console.log(horsePos.cy.animVal);
  const dx = horsePos.x - fencePos.x;
  const dy = horsePos.y - fencePos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  //console.log(horsePos.r);

  if (distance < horsePos.width + fencePos.width - 50) {
    console.log("COLLISION");
    document.querySelector("#horse circle").classList.add("collision");
  } else {
    document.querySelector("#horse circle").classList.remove("collision");
  }

  requestAnimationFrame(isCollided);
}
