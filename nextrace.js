"use strict";

let nextRace;
let now;
let races;
let aRace;

window.addEventListener("DOMContentLoaded", loadJSON);

function loadJSON() {
  fetch("http://josefinemargrethe.dk/kea/3-semester/dantoto/wordpress/wp-json/wp/v2/event?per_page=100")
    .then(response => response.json())
    .then(jsonData => {
      // when JSON is loaded, we will clone the data into our file
      prepareData(jsonData);
    });
}

function prepareData(jsonData) {
  races = jsonData;

  // sorter races efter date_time (omdøb til race_time), med ældste først
  races.sort((a, b) => {
    if (b.race_time < a.race_time) {
      return 1;
    } else {
      return -1;
    }
  });

  // gå igennem races, check om date_time er før now,
  const now = new Date();
  for (let i = 0; i < races.length; i++) {
    const race = races[i];
    const race_time = new Date(race.race_time);
    console.log(race);

    if (race_time.getTime() > now.getTime()) {
      nextRace = race;
      break;
    }
  }
  // hvis ikke, så har vi fundet next Race - og stop! med break;

  console.log("næste løb er " + nextRace.race_time);

  showCountdown(nextRace, races);
}

function showCountdown(nextRace) {
  // Set the date we're counting down to

  let countDownDate = new Date(nextRace.race_time).getTime();

  // Update the count down every 1 second
  let x = setInterval(function() {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="countdown"
    document.querySelectorAll(".countdown").forEach(div => {
      div.innerHTML = days + "d " + hours + "t " + minutes + "m " + seconds + "s ";
    });
    document.querySelectorAll(".location").forEach(div => {
      div.innerHTML = `${nextRace.location}`;
    });
    // document.querySelector("#countdown").innerHTML = days + "d " + hours + "t " + minutes + "m " + seconds + "s ";
    // document.querySelector("#location").innerHTML = `${nextRace.location}`;

    // If the count down is finished, write "UDLØBET" text
    if (distance < 0) {
      clearInterval(x);
      //document.querySelector("#countdown").innerHTML = "LIVE NU";
      loadJSON();
    }
  }, 1000);
}
