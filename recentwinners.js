"use strict";
get();
let yesTerms = [];

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
      visSpillere(spillere);
    });
}

let i = 1; // the index of the current item to show

function visSpillere(spillere) {
  spillere.forEach(spiller => {
    if (spiller.kr_vundet > 0 && spiller.terms == true) {
      yesTerms.push(spiller);
    }
  });
  const vinder1 = yesTerms[0];
  document.querySelectorAll(".spiller").forEach(div => {
    div.innerHTML = vinder1.brugernavn;
  });
  document.querySelectorAll(".bynavn").forEach(div => {
    div.innerHTML = vinder1.by;
  });
  document.querySelectorAll(".gevinst").forEach(div => {
    div.innerHTML = vinder1.kr_vundet;
  });
  console.log(yesTerms);
  setInterval(function() {
    const vinder = yesTerms[i];
    // setInterval makes it run repeatedly
    if (vinder.kr_vundet > 0 && vinder.terms == true) {
      document.querySelectorAll(".spiller").forEach(div => {
        div.innerHTML = vinder.brugernavn;
      });
      document.querySelectorAll(".bynavn").forEach(div => {
        div.innerHTML = vinder.by;
      });
      document.querySelectorAll(".gevinst").forEach(div => {
        div.innerHTML = vinder.kr_vundet;
      });
    }
    if (i == yesTerms.length - 1) {
      i = 0;
    } else {
      i++;
    }
    // get the item and increment
  }, 3000);
}
