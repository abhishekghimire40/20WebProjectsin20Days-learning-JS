const infoDiv = document.querySelector(".info");
const totalDiv = document.getElementById("total");
const addUserBtn = document.getElementById("addUser");
const doubleMoneyBtn = document.getElementById("doubleMoney");
const onlyMillionairesBtn = document.getElementById("onlyMillionaires");
const sortBtn = document.getElementById("sortRich");
const calculateWealthBtn = document.getElementById("calculateWealth");

// array to store the user
const user = [];

// check if there is already any user or not
const checkUser = function () {
  return user.length > 0;
};

// change the visibility of total div
const totalDivVisibility = function (state) {
  totalDiv.style.visibility = state;
};

// function to clear all the users
const clearInfoDiv = function () {
  infoDiv.innerHTML = "";
};

// display users in the infoDiv
const displayUsers = function (user) {
  clearInfoDiv();
  user.forEach((el) => infoDiv.appendChild(el));
};

// function to provide random wealth  for user
const getRandomWealth = function () {
  const min = 100000;
  const max = 10000000;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
};

// function to createChild span i.e. name and wealth of user
const createChildSpan = function (tag, text, state) {
  const addClass = state === 1 ? "headingPerson data" : "headingWealth data";
  const span = document.createElement("span");
  addClass.split(" ").forEach((el) => span.classList.add(el));
  span.textContent = text;
  tag.appendChild(span);
};

//function to addUser
const addUser = function () {
  totalDivVisibility("hidden");
  fetch("https://www.randomuser.me/api")
    .then((res) => res.json())
    .then((data) => {
      const newUser = data["results"][0]["name"];
      const name = `${newUser.first} ${newUser.last}`;
      const p = document.createElement("p");
      p.classList.add("usersInfo");
      const wealth = getRandomWealth().toLocaleString("en-US");
      createChildSpan(p, name, 1);
      createChildSpan(p, `$${wealth}`, 2);
      user.push(p);
      displayUsers(user);
    })
    .catch((error) => console.log(error));
};

//convert the currency string into num
const strToNum = function (str) {
  const num = parseInt(str.replace(/[$,]/g, ""));
  return num;
};

//double the  money of everyUser
const doubleMoney = function () {
  totalDivVisibility("hidden");
  if (checkUser()) {
    user.forEach((p) => {
      const doubleWealth = strToNum(p.lastChild.textContent) * 2;
      p.lastChild.textContent = `$${doubleWealth.toLocaleString("en-US")}`;
    });
  }
};

// function to show users who are millionaires
let onlyMillionairesState = false;
const onlyMillionaires = function () {
  totalDivVisibility("hidden");
  if (checkUser()) {
    if (!onlyMillionairesState) {
      const millionaires = user.filter(
        (user) => strToNum(user.lastChild.textContent) > 1000000
      );
      onlyMillionairesBtn.textContent = "All Users";
      displayUsers(millionaires);
    } else {
      onlyMillionairesBtn.textContent = "Show Only Millionaires";
      displayUsers(user);
    }
    onlyMillionairesState = !onlyMillionairesState;
  }
};

// function to sort the user in descending order order
let sorted = false;
const sortUsers = function () {
  totalDivVisibility("hidden");
  if (checkUser()) {
    if (!sorted) {
      const sortedUser = user
        .slice()
        .sort(
          (a, b) =>
            strToNum(b.lastChild.textContent) -
            strToNum(a.lastChild.textContent)
        );
      displayUsers(sortedUser);
      sortBtn.textContent = "Unsort";
    } else {
      displayUsers(user);
      sortBtn.textContent = "Sort by Richest";
    }
    sorted = !sorted;
  }
};

//function to calculate the total wealth of every users
const calculateTotalWealth = function () {
  if (checkUser()) {
    totalDivVisibility("visible");
    const totalWealth1 = user.reduce(
      (acc, curr) => acc + strToNum(curr.lastChild.textContent),
      0
    );
    totalDiv.lastElementChild.textContent = "";
    totalDiv.lastElementChild.textContent = `$${totalWealth1.toLocaleString(
      "en-us"
    )}`;
  }
};

clearInfoDiv();
addUserBtn.addEventListener("click", addUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
onlyMillionairesBtn.addEventListener("click", onlyMillionaires);
sortBtn.addEventListener("click", sortUsers);
calculateWealthBtn.addEventListener("click", calculateTotalWealth);
