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
      //når JSON er loadet tager vi vores data med videre til prepareData
      prepareData(jsonData);
    });
}

function prepareData(jsonData) {
  races = jsonData;

  // sorter races efter deres løbstidspunkt, med ældste først
  races.sort((a, b) => {
    if (b.race_time < a.race_time) {
      return 1;
    } else {
      return -1;
    }
  });

  // gå igennem races, check om race_time er før now,
  const now = new Date();
  for (let i = 0; i < races.length; i++) {
    const race = races[i];
    const race_time = new Date(race.race_time);
    console.log(race);

    // hvis ikke, så har vi fundet next Race - og stop! med break;

    if (race_time.getTime() > now.getTime()) {
      nextRace = race;
      break;
    }
  }

  console.log("næste løb er " + nextRace.race_time);

  showCountdown(nextRace, races);
}

function showCountdown(nextRace) {
  // sætter countdown dato til at være næste løb - som vi har fundet ovenfor

  let countDownDate = new Date(nextRace.race_time).getTime();

  // vi bruger setInterval til at tælle ned hvert sekund
  let x = setInterval(function() {
    //finder dato og tid lige nu
    let now = new Date().getTime();

    // vi finder distancen mellem nu og countdown-datoen
    let distance = countDownDate - now;

    // her laver vi beregninger på den 'distance' vi lige har fundet, så vi kan vise nedtællingen i både dage, timer, minutter og sekunder
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Vi laver et loop og indsætter nedtællingen samt stedet på pågældende løb i vores HTML
    document.querySelectorAll(".countdown").forEach(div => {
      div.innerHTML = days + "d " + hours + "t " + minutes + "m " + seconds + "s ";
    });
    document.querySelectorAll(".location").forEach(div => {
      div.innerHTML = `${nextRace.location}`;
    });

    // når distancen er mindre end 0 kalder vi loadJSON igen, så den automatisk læser dataen igen for at finde næste løb i rækken
    if (distance < 0) {
      clearInterval(x);
      loadJSON();
    }
  }, 1000);
}
