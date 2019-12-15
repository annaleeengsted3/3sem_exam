"use strict";

let allUsers = [];
let currentList = [];
let sortButton;
let Filter;
const loginForm = document.querySelector(".login-form");
const formEdit = document.querySelector("form.formEdit");
let admin = false;

window.addEventListener("DOMContentLoaded", start);

function start() {
  document.querySelector(".login").addEventListener("click", openLogin);

  document.querySelector(".admin-login").addEventListener("click", () => {
    event.preventDefault();
    if (loginForm.elements.username.value == "admin" && loginForm.elements.password.value == "12345") {
      admin = true;
      adminLogin();
    }
  });

  document.querySelectorAll(".sort").forEach(elm => {
    elm.addEventListener("click", setSort);
  });

  document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", setFilter);
  });

  formEdit.addEventListener("submit", evt => {
    evt.preventDefault();
    document.querySelector(".formEdit").classList.add("hide");
    put();
  });

  get();
}

function get() {
  fetch("https://dantoto-1f71.restdb.io/rest/brugere?per_page=100", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5dea0bc34658275ac9dc23ad",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(users => {
      //console.log(users);
      //users.forEach(cleanJSON);
      prepareObjects(users);
    });
}

function prepareObjects(users) {
  console.log("users are:");
  console.log(users);
  users.forEach(jsonObject => {
    // Create new object with cleaned data from our prototype
    const user = Object.create(User);

    user.brugernavn = jsonObject.brugernavn;
    user.password = jsonObject.password;
    user.email = jsonObject.email;
    user.by = jsonObject.by;
    user.kr_vundet = jsonObject.kr_vundet;
    user._id = jsonObject._id;
    user.terms = jsonObject.terms;

    allUsers.push(user);
    //  currentList.push(user);
  });
  rebuildList();
}

function rebuildList() {
  //console.log("rebuild List");
  //filterListBy("all");

  // if Filter = harVundet

  // else if Filter = har Ikke vundet
  if (Filter == "vundet") {
    currentList = allUsers.filter(harVundet);
  } else if (Filter == "ikke_vundet") {
    currentList = allUsers.filter(ikkeVundet);
  } else if (Filter == "nej_terms") {
    currentList = allUsers.filter(nejTerms);
  } else if (Filter == "ja_terms") {
    currentList = allUsers.filter(jaTerms);
  } else {
    currentList = allUsers.filter(alleBrugere);
  }

  displayList(currentList);
}

function harVundet(user) {
  return user.kr_vundet > 0;
}

function ikkeVundet(user) {
  return user.kr_vundet == 0;
}

function alleBrugere(user) {
  return true;
}

function nejTerms(user) {
  return user.terms == false;
}

function jaTerms(user) {
  return user.terms == true;
}

function setSort() {
  sortButton = this.getAttribute("data-sort");

  sortCurrentUsers(sortButton);
}

function sortCurrentUsers(sortButton) {
  allUsers.sort((a, b) => {
    let comp;
    if (sortButton == "gevinst") {
      comp = b.kr_vundet - a.kr_vundet;
    } else if (sortButton == "brugernavn") {
      comp = a.brugernavn.localeCompare(b.brugernavn);
    }
    return comp;
  });

  rebuildList();
}

// FILTRERING

function filterListBy(filterBy) {
  currentList = allUsers.filter(user => {
    return true;
  });
}

function setFilter() {
  Filter = this.dataset.filter;
  document.querySelectorAll(".filter").forEach(elm => {
    elm.classList.remove("valgt");
  });
  this.classList.add("valgt");
  //console.log(Filter);

  rebuildList();

  // currentList = filtering(Filter);
  // displayList(currentList);
}

function displayList(users) {
  console.log("display new list");
  // we are clearing the list
  document.querySelector(".users").innerHTML = "";

  // we are building a new list
  users.forEach(displayUser);
}

function displayUser(user) {
  // create clone
  const clone = document.querySelector("template").content.cloneNode(true);
  clone.querySelector("article.singleUser").dataset.userid = user._id;

  // set clone data
  clone.querySelector(".brugernavn").innerHTML = user.brugernavn;
  clone.querySelector(".by").innerHTML = user.by;
  if (user.kr_vundet == 0) {
    clone.querySelector(".kr_vundet").innerHTML = `<article>${user.brugernavn} har ikke vundet noget endnu.`;
  } else {
    clone.querySelector(".kr_vundet").innerHTML = `<article>${user.brugernavn} har i alt vundet: ${user.kr_vundet} kr.`;
  }

  //delete user

  clone.querySelector(".deleteBtn").addEventListener("click", () => {
    //console.log(user._id);
    deleteUser(user._id);
  });

  //edit user
  clone.querySelector(".editBtn").addEventListener("click", e => {
    //what happens when you pres the edit button goes here
    //first fetch, then populate a form
    //how do we fetch a single post from restdb? -->
    event.preventDefault();
    document.querySelector(".formEdit").classList.remove("hide");

    fetchAndPopulate(user._id);
    console.log(user._id);
  });

  // append clone to list
  document.querySelector(".users").appendChild(clone);
}

function openLogin() {
  document.querySelector("#popup").style.display = "block";
  document.querySelector("#popup #luk").addEventListener("click", close);
}

function close() {
  document.querySelector("#popup").style.display = "none";
}

function adminLogin() {
  //... den skal kun gå videre hertil hvis brugeren har indtastet det korrekte i form
  //if username == "admin" && password == "12345" {...}
  if (admin == true) {
    document.querySelectorAll(".adminBtn").forEach(adminButton => {
      adminButton.style.display = "block";
    });

    document.querySelector("#popup").style.display = "none";
  }
}

//DELETE USER
function deleteUser(_id) {
  fetch("https://dantoto-1f71.restdb.io/rest/brugere/" + _id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5dea0bc34658275ac9dc23ad",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      //TODO: Delete from DOM
      //console.log(`.singleUser[data-userid="${_id}"]`);
      document.querySelector(`.singleUser[data-userid="${_id}"]`).remove();
    });

  rebuildList();
}

//EDIT USER
function fetchAndPopulate(_id) {
  fetch(`https://dantoto-1f71.restdb.io/rest/brugere/${_id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5dea0bc34658275ac9dc23ad",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(users => {
      console.log("users in fecthAndPop " + users);
      formEdit.elements.brugernavn.value = users.brugernavn;
      formEdit.elements.email.value = users.email;
      formEdit.elements.password.value = users.password;
      formEdit.elements.by.value = users.by;
      formEdit.elements.kr_vundet.value = users.kr_vundet;
      formEdit.elements.terms.value = users.terms;
      formEdit.elements._id.value = users._id;
    });
}

function put() {
  let data = {
    brugernavn: formEdit.elements.brugernavn.value,
    email: formEdit.elements.email.value,
    password: formEdit.elements.password.value,
    by: formEdit.elements.by.value,
    kr_vundet: formEdit.elements.kr_vundet.value,
    terms: formEdit.elements.terms.value,
    _id: formEdit.elements._id.value
  };

  // console.log(data);

  const postData = JSON.stringify(data);
  const superID = formEdit.elements._id.value;
  fetch("https://dantoto-1f71.restdb.io/rest/brugere/" + superID, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5dea0bc34658275ac9dc23ad",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(t => t.json())
    .then(updatedUser => {
      //getUser(data);
      const daddy = document.querySelector(`.singleUser[data-userid="${updatedUser._id}"]`);

      daddy.querySelector(".brugernavn").innerHTML = updatedUser.brugernavn;
      daddy.querySelector(".by").innerHTML = updatedUser.by;
      if (updatedUser.kr_vundet == 0) {
        daddy.querySelector(".kr_vundet").innerHTML = `<article>${updatedUser.brugernavn} har ikke vundet noget endnu.`;
      } else {
        daddy.querySelector(".kr_vundet").innerHTML = `<article>${updatedUser.brugernavn} har i alt vundet: ${updatedUser.kr_vundet} kr.`;
      }

      //prepareObjects(updatedUser);
      allUsers = allUsers.map(user => {
        if (user._id != updatedUser._id) {
          return user;
        } else {
          return updatedUser;
        }
      });
      rebuildList();

      // console.log(data);
    });
}

function post(data) {
  const postData = JSON.stringify(data);
  fetch("https://dantoto-1f71.restdb.io/rest/brugere/", {
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
      //getUser(data);
      cleanJSON(data);
      // console.log(data);
    });
}

//Prototype user
const User = {
  brugernavn: "-brugernavn-",
  password: "-password-",
  email: "-email-",
  by: "-by-",
  kr_vundet: "-kr_vundet-",
  terms: "-terms-",
  _id: "-id-"
};
