"use strict";

window.addEventListener("DOMContentLoaded", init);

let time;
let gameover = false;
const fences = document.querySelectorAll(".fence");
const fencesHitbox = document.querySelectorAll(".fence circle");
const horse = document.querySelector("#horse");
//const fence = document.querySelectorAll(".fence");

function init() {
  document.querySelector(`button[data-action="start"]`).addEventListener("click", () => {
    startAnimations();
    timeCount();
    document.onkeydown = checkKey;
    document.onkeyup = resetAnimation;
  });
  document.querySelector(`button[data-action="stop"]`).addEventListener("click", () => {
    gameover = true;
    stopCount();
  });
  //moveFence();
  isCollided();
}

function startAnimations() {
  fences.forEach(fence => {
    fence.classList.add("fence_move");
  });
  document.querySelector(".second_fence").addEventListener("animationiteration", calculateDelay);
}

function calculateDelay() {
  console.log("delay calculating");
  let number = generateRandomNumber();
  console.log(number);
  //document.querySelector(".second_fence").style.animationDelay = `${number}s`;
  document.querySelector(".second_fence").style.transform = `translateX(${number}vw)`;
  //document.querySelector(".second_fence").style.setProperty("--delay", number);
}

function generateRandomNumber() {
  //generate a random second delay (or translateX value?) for fence #2, between 1.5s and 3s
  return Math.random() * (15 - 12 + 1) + 12;
}

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
    // horse.addEventListener("animationend", ()=>{
    //   horse.classList.remove("jump");
    // })
  }
}

function resetAnimation() {
  horse.classList.remove("jump");
}

function isCollided() {
  //const horsePos = document.querySelector("#horse circle");
  const horsePos = document.querySelector("#horse circle").getBoundingClientRect();

  //const fencePos = document.querySelector(".fence circle").getBoundingClientRect();
  let collided = false;
  fencesHitbox.forEach(fence => {
    const fencePos = fence.getBoundingClientRect();
    const dx = horsePos.x - fencePos.x;
    const dy = horsePos.y - fencePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    //console.log(horseY);

    if (distance < horsePos.width / 2 + fencePos.width / 2) {
      console.log("COLLISION");
      document.querySelector("#horse circle").classList.add("collision");
      collided = true;
      gameover = true;
    } else {
      document.querySelector("#horse circle").classList.remove("collision");
    }
  });

  requestAnimationFrame(isCollided);
  // if (!collided) {
  //   requestAnimationFrame(isCollided);
  // }

  // const horseX = horsePos.right - horsePos.left;
  // const fenceX = fencePos.right - fencePos.left;
  // const horseY = horsePos.bottom - horsePos.top;
  // const fenceY = fencePos.bottom - fencePos.top;
  // const dx = horseX - fenceX;
  // const dy = horseY - fenceY;
}

function timeCount() {
  const startTime = Date.now();
  let elapsedTime;

  setInterval(function() {
    elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    //document.querySelector("#time").innerHTML = elapsedTime;
    time = elapsedTime;
    if (gameover == false) {
      showTime(elapsedTime);
    }
  }, 100);
}

function showTime(elapsedTime) {
  document.querySelector("#time").innerHTML = elapsedTime;
}

function stopCount() {
  //console.log("stopped time");
  document.querySelector("#time").innerHTML = time;
}
