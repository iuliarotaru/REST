"use strict";
const form = document.querySelector("form");

//GET
//----------------------------------------------
function get() {
  fetch("https://frontendautumn2019-9fed.restdb.io/rest/friends  ", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887e69fd86cb75861e2627",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(friends => {
      friends.forEach(addFriendToTheDom);
    });
}
function addFriendToTheDom(friend) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h1").textContent = friend.name;
  copy.querySelector("h2").textContent = friend.age;
  copy.querySelector("p").textContent = friend.description;
  document.querySelector("#friends").prepend(copy);
}
get();

//POST
//-------------------------------------------------
function post() {
  const data = {
    name: form.elements.name.value,
    age: form.elements.age.value,
    description: form.elements.description.value
  };

  const postData = JSON.stringify(data);
  fetch("https://frontendautumn2019-9fed.restdb.io/rest/friends", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887e69fd86cb75861e2627",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      addFriendToTheDom(data);
    });
  document.querySelector("form").reset();
}

document.querySelector("#submit").addEventListener("click", e => {
  post();
});

form.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();
});
form.elements.name.addEventListener("focus", e => {
  form.elements.name.classList.remove("notValid");
});
form.elements.name.addEventListener("blur", e => {
  if (form.elements.name.reportValidity()) {
    form.elements.name.classList.add("notValid");
  }
});
