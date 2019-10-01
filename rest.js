"use strict";
const form = document.querySelector("#addForm");
const formEdit = document.querySelector("#editForm");

//Event listeners for the forms buttons
document.querySelector("#submit").addEventListener("click", e => {
  post();
});

form.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();
});
formEdit.addEventListener("submit", evt => {
  evt.preventDefault();
  put();
});
form.setAttribute("novalidate", true);
form.elements.name.addEventListener("focus", e => {
  form.elements.name.classList.remove("notValid");
});
form.elements.name.addEventListener("blur", e => {
  if (form.elements.name.checkValidity()) {
    form.elements.name.classList.add("notValid");
  } else {
    form.elements.name.classList.add("notValid");
  }
});
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
  copy.querySelector("#template-content").dataset.friendid = friend._id;
  copy.querySelector("h1").textContent = friend.name;
  copy.querySelector("h2").textContent = friend.age;
  copy.querySelector("p").textContent = friend.description;
  copy.querySelector("button.btnDelete").addEventListener("click", () => {
    deleteIt(friend._id);
  });

  copy.querySelector("button.btnEdit").addEventListener("click", () => {
    fetchAndPopulate(friend._id);
  });
  document.querySelector("#friends").prepend(copy);
}
get();

function fetchAndPopulate(id) {
  fetch(`https://frontendautumn2019-9fed.restdb.io/rest/friends/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887e69fd86cb75861e2627",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(friends => {
      formEdit.elements.name.value = friends.name;
      formEdit.elements.age.value = friends.age;
      formEdit.elements.description.value = friends.description;
      formEdit.elements.id.value = friends._id;
    });
}

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

//Delete
//-------------------------------------------------
function deleteIt(id) {
  fetch("https://frontendautumn2019-9fed.restdb.io/rest/friends/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887e69fd86cb75861e2627",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      document
        .querySelector(`#template-content[data-friendid="${id}"]`)
        .remove();
    });
}

//PUT
//--------------------------------------------------
function put() {
  let data = {
    name: formEdit.elements.name.value,
    age: formEdit.elements.age.value,
    description: formEdit.elements.description.value
  };
  let postData = JSON.stringify(data);
  const friendId = formEdit.elements.id.value;

  fetch("https://frontendautumn2019-9fed.restdb.io/rest/friends/" + friendId, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887e69fd86cb75861e2627",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(d => d.json())
    .then(updateFriend => {
      //find the parent
      const parentElement = document.querySelector(
        `#template-content[data-friendid="${updateFriend._id}"]`
      );

      //update the dom
      parentElement.querySelector("h1").textContent = updateFriend.name;
      parentElement.querySelector("h2").textContent = updateFriend.age;
      parentElement.querySelector("p").textContent = updateFriend.description;
    });
}
