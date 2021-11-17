//  1. Implement a request to recieve users
//  2. Implement a response handler from the server
//  3. Render the list of users
//  4. Hang a click event on a list
//  5. Receive user id
//  6. Make a request to the server receiving info of the selected user
//  7. Hang the handler on the response from the server
//  8. Render information about the user

const apiURL = "https://jsonplaceholder.typicode.com/users/";
const usersListEl = document.querySelector(".users-list");
const userInfoEl = document.querySelector(".user-info");
usersListEl.addEventListener("click", onUsersListHandler);
function onUsersListHandler(e) {
  e.preventDefault();
  if (e.target.dataset.userId) {
    const id = e.target.dataset.userId;
    const url = `${apiURL}${id}`;
    getRequest(url, getUserInfoCallBack);
  }
}

function getRequest(url, cb) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  xhr.addEventListener("load", () => {
    if (xhr.status != 200) {
      console.log("Error", xhr.status);
      return;
    }
    const res = JSON.parse(xhr.responseText);
    cb(res);
  });

  xhr.send();
}

function getUserInfoCallBack(user) {
  if (!user.id) {
    console.log("User not found");
    return {};
  }

  renderUserInfo(user);
}

function getUsersCallback(users) {
  if (!users.length) {
    return {};
  }
  renderUsersList(users);
}

function renderUsersList(users) {
  const fragHTML = users.reduce((acc, user) => {
    return acc + userListItemTemplate(user);
  }, "");
  usersListEl.insertAdjacentHTML("beforeend", fragHTML);
}

function renderUserInfo(user) {
  userInfoEl.innerHTML = "";
  const tempHTML = userInfoTemplate(user);
  userInfoEl.insertAdjacentHTML("beforeend", tempHTML);
}

function userInfoTemplate(user) {
  return `
        <div class="card border-dark mb-3">
            <div class="card-header">${user.name}</div>
            <div class="card-header text-dark">
                <h5 class="card-title">${user.email}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Nickname:</b> ${user.name}</li>
                    <li class="list-group-item"><b>Website:</b> ${user.website}</li>
                    <li class="list-group-item"><b>Company name:</b> ${user.company.name}</li>
                    <li class="list-group-item"><b>Nickname:</b> ${user.address.city}</li>
                </ul>

            </div>
        </div>
    `;
}

function userListItemTemplate(user) {
  return `
            <button type="button" class="list-group-item list-group-item-action" data-user-id="${user.id}">${user.name}</button>
            `;
}

getRequest(apiURL, getUsersCallback);
