"use strict";

let yesTerms = [];
let allebrugere = [];

//Make a new user when clicking submit
const form = document.querySelector("form");

function submitForm() {
  form.addEventListener("submit", evt => {
    evt.preventDefault();
    //   const boxes = Array.from(form.querySelectorAll("[type=checkbox]:checked"));
    //   const nice = boxes.map(el => {
    //     return el.value;
    //   });
    let userObject = {
      brugernavn: form.elements.brugernavn.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
      by: form.elements.by.value,
      terms: form.elements.terms.checked,
      kr_vundet: 0
    };
    post(userObject);
    //form.reset();
    //evt.preventDefault();
  });
}

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
      spillere.forEach(spiller => {
        allebrugere.push(spiller);
      });
      console.log(allebrugere);
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

form.elements.brugernavn.addEventListener("blur", checkForm);
form.elements.email.addEventListener("blur", checkForm);
// document.querySelector(".nextBtn").addEventListener("click", checkForm);

function checkForm() {
  console.log("blurred");
  allebrugere.forEach(user => {
    if (user.brugernavn == form.elements.brugernavn.value || user.email == form.elements.email.value) {
      alert("bruger eksisterer allerede");
      //disable "videre" knappen?
    }
  });
}

function post(data) {
  const postData = JSON.stringify(data);
  fetch("https://dantoto-1f71.restdb.io/rest/brugere", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5dea0bc34658275ac9dc23ad",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}
