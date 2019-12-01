"use strict";
console.log("runnin");
window.addEventListener("DOMContentLoaded", init);

let time;
let gameover = false;
//const fences = document.querySelectorAll(".fence circle");
// const fences = document.querySelectorAll(".fence");
const fences = document.querySelectorAll(".fence circle");
const horse = document.querySelector("#horse");
//const fence = document.querySelectorAll(".fence");

function init() {
  document.querySelector(`button[data-action="start"]`).addEventListener("click", () => {
    isCollided();
    startAnimations();
    timeCount();
  });
  document.querySelector(`button[data-action="stop"]`).addEventListener("click", () => {
    gameover = true;
    stopCount();
  });
  //moveFence();
}

function startAnimations() {
  fences.forEach(fence => {
    fence.classList.add("fence_move");
  });
}

// const speed = 19; //vw per s
// let last;
// let pos = 0;

// function moveFence() {
//   const now = performance.now();

//   const delta = now - last || 0;

//   last = now;

//   pos += speed / (1000 / delta);
//   if (pos > 110) {
//     pos = 0;
//   }
//   fence.style.transform = `translateX(-${pos}vw)`;

//   requestAnimationFrame(moveFence);
// }

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

const horsePos = document.querySelector("#horse circle").getBoundingClientRect();

function isCollided() {
  //const horsePos = document.querySelector("#horse circle");

  //const fencePos = document.querySelector(".fence circle").getBoundingClientRect();
  let collided = false;
  fences.forEach(fence => {
    const fencePos = fence.getBoundingClientRect();
    const dx = horsePos.x - fencePos.x;
    const dy = horsePos.y - fencePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < horsePos.height / 2 + fencePos.height / 2) {
      console.log("COLLISION");
      document.querySelector("#horse circle").classList.add("collision");
      collided = true;
      gameover = true;
    } else {
      document.querySelector("#horse circle").classList.remove("collision");
    }
  });
  //   requestAnimationFrame(isCollided);

  //console.log(horsePos.cy.animVal);
  if (!collided) {
    requestAnimationFrame(isCollided);
  }
}

function timeCount() {
  console.log("function time=" + time);

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
  console.log("stopped time");
  document.querySelector("#time").innerHTML = time;
}
