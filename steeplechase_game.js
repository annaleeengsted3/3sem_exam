"use strict";

window.addEventListener("DOMContentLoaded", init);

let time;
let gameover = false;
const fences = document.querySelectorAll(".fence");
let i = 0;
const horse = document.querySelector("#horse");
let speed = 2.5;

function init() {
  document.querySelector(".fade_in").style.opacity = 1;
  fetchSVG();
  addParallax();
  document.querySelector(`button[data-action="start"]`).addEventListener("click", () => {
    document.querySelector("#popup").style.display = "none";
    document.querySelector("#game").style.filter = "none";
    startAnimations();
    timeCount();
    document.querySelector("body").addEventListener("keydown", checkKey);
    document.querySelector("body").addEventListener("keyup", resetAnimation);
    isCollided();
  });
}

async function fetchSVG() {
  const url = "game_img/front_page.svg";
  const svgData = await fetch(url);
  const svg = await svgData.text();
  showSVG(svg);
}

function showSVG(svg) {
  document.querySelector(".start_horse").innerHTML = svg;
}

function addParallax() {
  document.querySelector(".bushes").style.animation = `parallax 40s linear infinite`;
  document.querySelector(".middle").style.animation = `parallax 16s linear infinite`;
  document.querySelector(".white_fence").style.animation = `parallax 12s linear infinite`;
}

function startAnimations() {
  let number = generateRandomNumber();
  i++;

  if (gameover == false) {
    setTimeout(function() {
      createFence(i);
      requestAnimationFrame(startAnimations);
    }, number);
  }
}

function createFence(i) {
  if (gameover == false) {
    const fence = document.createElement("div");
    fence.className = "fence";
    document.querySelector("#game").appendChild(fence);
    document.querySelector(".fence").style.setProperty("--speed", speed + "s");
    addAnimation(fence);
    if (i % 5 === 0) {
      console.log("fences divisible by 5");
      //to do: add user feedback like "good job" etc, feedback that it gets harder now:
      speed = speed - 0.4;
      document.querySelector(".fence").style.setProperty("--speed", speed + "s");
    }
  }
}

function addAnimation(fence) {
  fence.addEventListener("animationend", () => {
    fence.remove();
  });
}

function generateRandomNumber() {
  //generate a random second delay between generation of fences, between 1.5s and 3s
  return Math.random() * (4000 - 1200 + 1) + 1200;
}

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "32") {
    //space
    //TO DO: Stop galloping sound, add jumping?
    document.querySelector(".horse_sprite").style.opacity = 0;
    document.querySelector(".horse_jumping").style.opacity = 1;
    horse.classList.add("jump");
    // horse.addEventListener("animationend", ()=>{
    //   horse.classList.remove("jump");
    // })
  }
}

function resetAnimation() {
  horse.classList.remove("jump");
  //TO DO: Start galloping sound, remove jumping
  document.querySelector(".horse_sprite").style.opacity = 1;
  document.querySelector(".horse_jumping").style.opacity = 0;
}

function isCollided() {
  const fencesHitbox = document.querySelectorAll(".fence");
  const horsePos = document.querySelector(".horse_hitbox").getBoundingClientRect();
  let collided = false;
  fencesHitbox.forEach(fence => {
    const fencePos = fence.getBoundingClientRect();
    const dx = horsePos.x - fencePos.x;
    const dy = horsePos.y - fencePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < horsePos.width / 2 + (fencePos.width / 2 - 20)) {
      console.log("COLLISION");
      collided = true;
      gameover = true;
      stopCount();
      gameOver();
    }
  });

  if (!collided) {
    requestAnimationFrame(isCollided);
  }
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
  document.querySelector("#time_holder").innerHTML = elapsedTime;
}

function stopCount() {
  document.querySelector("#time_holder").innerHTML = time;
}

function gameOver() {
  document.querySelectorAll(".fence").forEach(fence => {
    fence.style.animationPlayState = "paused";
  });
  document.querySelector("body").removeEventListener("keydown", checkKey);
  document.querySelector("body").removeEventListener("keyup", resetAnimation);
  document.querySelector(".bushes").style.animationPlayState = `paused`;
  document.querySelector(".middle").style.animationPlayState = `paused`;
  document.querySelector(".white_fence").style.animationPlayState = `paused`;

  //TO DO: Add GAMEOVER sound
  document.querySelector(".horse_sprite").style.opacity = 0;
  document.querySelector(".horse_jumping").style.opacity = 0;
  document.querySelector(".horse_dead").style.opacity = 1;

  document.querySelector("#gameover").style.display = "block";
  document.querySelector(".gameover_time").innerHTML = time;
  document.querySelector("#replay").addEventListener("click", () => {
    //TO DO: MAKE THE RESET PROPER. RESET VARIABLES, ANIMATIONS, ETC
    location.reload();
  });
}
