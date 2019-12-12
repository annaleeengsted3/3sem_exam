"use strict";
// let navn = ["", "MangoMorten47", "JægerJesper09", "KiwiKaren11"];
// let by = [, "", "København", "Svendbårg", "HoltE"];

// let gevinst = [, "", "100kr", "50kr", "45kr"];
get();

function get() {
  fetch("https://dantoto-1f71.restdb.io/rest/brugere", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5dea0bc34658275ac9dc23ad",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(spillere => {
      console.log(spillere);
      //visSpiller();
    });
}
let vindere = [
  {
    navn: "NielsNielsen69",
    by: "Århus",
    gevinst: "500kr"
  },
  {
    navn: "SusanneSavannen12",
    by: "Aalborg",
    gevinst: "200kr"
  },
  {
    navn: "MangoMorten47",
    by: "København",
    gevinst: "100kr"
  },
  {
    navn: "JægerJesper09",
    by: "Svendbårg",
    gevinst: "50kr"
  }
];

let i = 0; // the index of the current item to show

setInterval(function() {
  const vinder = vindere[i];
  // setInterval makes it run repeatedly
  document.getElementById("spiller").innerHTML = `Vores spiller 
  ${vinder.navn}`;
  document.getElementById("bynavn").innerHTML = `fra ${vinder.by}`;
  document.getElementById("gevinst").innerHTML = `har lige vundet ${vinder.gevinst}`; // get the item and increment
  i++;
  if (i == vindere.length) i = 0; // reset to first element if you've reached the end
}, 10000);
