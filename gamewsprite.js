"use strict";

window.addEventListener("DOMContentLoaded", init);

let time;
let gameover = false;
const fences = document.querySelectorAll(".fence");

const horse = document.querySelector("#horse");
//const fence = document.querySelectorAll(".fence");

function init() {
  document.querySelector(`button[data-action="start"]`).addEventListener("click", () => {
    document.querySelector("#popup").style.display = "none";
    startAnimations();
    timeCount();
    document.onkeydown = checkKey;
    document.onkeyup = resetAnimation;
    isCollided();
  });
  document.querySelector(`button[data-action="stop"]`).addEventListener("click", () => {
    gameover = true;
    stopCount();
  });
  //moveFence();
}

function startAnimations() {
  let number = generateRandomNumber();

  setTimeout(function() {
    createFence();
    requestAnimationFrame(startAnimations);
  }, number);
}

function createFence() {
  const fence = document.createElement("div");
  fence.className = "fence";
  document.body.appendChild(fence);
  addAnimation(fence);
}

function addAnimation(fence) {
  //fence.classList.add("fence_move");
  fence.addEventListener("animationend", () => {
    fence.remove();
  });
}

function generateRandomNumber() {
  //generate a random second delay (or translateX value?) for fence #2, between 1.5s and 3s
  return Math.random() * (4000 - 1200 + 1) + 1200;
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
  //console.log("collision detection started");
  //const horsePos = document.querySelector("#horse circle");
  const fencesHitbox = document.querySelectorAll(".fence");
  const horsePos = document.querySelector("#horse circle").getBoundingClientRect();
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
  if (elapsedTime > 10) {
    console.log("time over 10");
    //to do: fix this! Jerking animation, probably called too many times- where else to put this?
    document.querySelector(".fence").style.animationDuration = `2s`;
  }
}

function stopCount() {
  //console.log("stopped time");
  document.querySelector("#time").innerHTML = time;
}
