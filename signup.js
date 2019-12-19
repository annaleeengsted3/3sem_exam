"use strict";

//Make a new user when clicking submit
const form = document.querySelector("form");
form.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();

  let userObject = {
    brugernavn: form.elements.brugernavn.value,
    email: form.elements.email.value,
    password: form.elements.password.value,
    by: form.elements.by.value,
    terms: form.elements.terms.checked,
    kr_vundet: 0
  };

  post(userObject);
  form.reset();
});

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
