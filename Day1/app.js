"use-strict";

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const btnSubmit = document.getElementById("submit");
const formControl = Array.from(document.querySelectorAll(".form-control"));

const getIndex = function (field) {
  return formControl.indexOf(field.parentNode);
};
const getMessage = function (field) {
  switch (field) {
    case username:
      return `Username Must contain atleast 3 letters`;
      break;
    case email:
      return `Please enter a valid email.`;
      break;
    case password:
      return "Password must contain atleast one uppercase, lowercase,number,\nspecial characters and must be of length greater than 8";
      break;
    case password2:
      return `Passwords do not match.`;
      break;
    default:
      return;
  }
};
const setMessage = function (field, message = "") {
  const parent = field.parentNode;
  const childSmall = parent.querySelector("small");
  if (message) {
    childSmall.style.visibility = "visible";
    childSmall.textContent = message;
  } else {
    childSmall.style.visibility = "hidden";
    childSmall.textContent = message;
  }
};
const color = function (index, state) {
  const state2 = state === "error" ? "success" : "error";
  formControl[index].classList.remove(state2);
  formControl[index].classList.add(state);
};

const valid = function (field, val) {
  const parentIndex = getIndex(field);
  const state = val ? "success" : "error";
  color(parentIndex, state);
  if (val) setMessage(field);
  else {
    const message = getMessage(field);
    setMessage(field, message);
  }
};

// const validPass = function (field) {
//   const parentIndex = getIndex(field);
//   color(parentIndex, "success");
//   setMessage(field);
// };
// const validFailed = function (field) {
//   const parentIndex = getIndex(field);
//   color(parentIndex, "error");
//   const message = getMessage(field);
//   setMessage(field, message);
// };

const usernameValid = function (usernameValue) {
  if (usernameValue.length >= 3) valid(username, true);
  else valid(username, false);
};

const emailValid = function (emailValue) {
  const re =
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
  re.test(emailValue) ? valid(email, true) : valid(email, false);
};

const passwordValid = function (passwordVal) {
  const re =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
  re.test(passwordVal) ? valid(password, true) : valid(password, false);
};

const confirmPassword = function (pass1, pass2) {
  pass1 === pass2 ? valid(password2, true) : valid(password2, false);
};

const checkResult = function (field) {
  const indexField = getIndex(field);
  if (!field.value) {
    formControl[indexField].classList.add("error");
    valid(field, false);
  } else {
    if (field === username) usernameValid(username.value);
    if (field === email) emailValid(email.value);
    if (field === password) passwordValid(password.value);
    if (field === password2) confirmPassword(password.value, password2.value);
  }
};

form.onsubmit = function (e) {
  e.preventDefault();
  checkResult(username);
  checkResult(email);
  checkResult(password);
  checkResult(password2);
};
