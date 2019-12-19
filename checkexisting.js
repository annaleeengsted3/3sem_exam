"use strict";

document.querySelector("#brugernavn").addEventListener("blur", checkUser);
document.querySelector("#email").addEventListener("blur", checkEmail);

function checkUser() {
  const userName = document.querySelector("form").elements.brugernavn.value;
  fetch(`https://dantoto-1f71.restdb.io/rest/brugere?q={"brugernavn": "${userName}"}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5dea0bc34658275ac9dc23ad",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(users => {
      if (users.length > 0) {
        console.log("user exists");
        document.querySelector("form").elements.brugernavn.value = "Bruger eksisterer allerede";
        document.querySelector("#brugernavn").style.color = "red";
        document.querySelector(".nextBtn").style.backgroundColor = "gray";
        document.querySelector(".nextBtn").disabled = true;
      } else {
        document.querySelector("#brugernavn").style.color = "black";
        document.querySelector(".nextBtn").style.backgroundColor = "#dc5f11";
        document.querySelector(".nextBtn").disabled = false;
      }
    });
}

function checkEmail() {
  const userEmail = document.querySelector("form").elements.email.value;
  fetch(`https://dantoto-1f71.restdb.io/rest/brugere?q={"email": "${userEmail}"}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5dea0bc34658275ac9dc23ad",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(users => {
      if (users.length > 0) {
        console.log("email exists");
        document.querySelector("form").elements.email.value = "Email eksisterer allerede";
        document.querySelector("#email").style.color = "red";
        document.querySelector(".nextBtn").style.backgroundColor = "gray";
        document.querySelector(".nextBtn").disabled = true;
      } else {
        document.querySelector("#email").style.color = "black";
        document.querySelector(".nextBtn").style.backgroundColor = "#dc5f11";
        document.querySelector(".nextBtn").disabled = false;
      }
    });
}
