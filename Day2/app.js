"use-strict";
const container = document.querySelector(".container");
const movie = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat");
const count = document.getElementById("count");
const total = document.getElementById("total");

let counter = 0;
let ticketPrice = +movie.value;

//displayInfo
// const displayInfo = function () {
//   count.textContent = counter;
//   total.textContent = counter * ticketPrice;
// };

//select movie change event
// movie.onchange = function () {
//   ticketPrice = +this.value;
//   displayInfo();
// };

// saving indexes of selected item to local storage
// const setStorage = function (seat) {
//   const selectedSeats = [...seats]
//     .filter((s) => s.classList.contains("selected"))
//     .map((s) => [...seats].indexOf(s));
//   localStorage.setItem("selectedIndexArray", JSON.stringify(selectedSeats));
// };

// get data from local storage
// const getStorage = function () {
//   return JSON.parse(localStorage.getItem("selectedIndexArray"));
// };

//add selected class to seat to select the seat and change its color
// const selectSeats = function (seat, state) {
//   if (state) {
//     seat.classList.add("selected");
//     counter += 1;
//   } else {
//     seat.classList.remove("selected");
//     counter = counter > 0 ? counter - 1 : 0;
//   }
//   displayInfo();
//   setStorage(seat);
// };

//dispaly previous selected seats if any on load
// const displayOnLoad = function (...totalSelected) {
//   const seatsSelect = totalSelected.map((s) => [...seats][s]);
//   seatsSelect.forEach((s) => {
//     selectSeats(s, true);
//   });
// };

//seats click event
// seats.forEach(function (seat) {
//   seat.onclick = function () {
//     const classes = Array.from(seat.classList); //we can also use spread operator for this
//     if (!classes.includes("occupied") && !classes.includes("selected")) {
//       selectSeats(seat, true);
//     }
//     if (classes.includes("selected")) {
//       selectSeats(seat, false);
//     }
//   };
// });

// window.onload = function () {
//   const previousSelectedSeats = getStorage();
//   if (previousSelectedSeats) {
//     displayOnLoad(...previousSelectedSeats);
//   }
// };

// ======================================================================================
//better way to perform the above task as done by brad

const seats1 = document.querySelectorAll(".row .seat:not(.occupied)");

//save movieindex and price to local storage
const setMovieData = (movieIndex, price) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", price);
};

//updating ui with total selected seats and price
const UpdateUI = function () {
  const totalSelectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatIndexes = [...totalSelectedSeats].map((seat) =>
    [...seats1].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndexes));

  count.textContent = totalSelectedSeats.length;
  total.textContent = totalSelectedSeats.length * ticketPrice;
};

//change event when movie is changed in select
//we cannot use arrow function here as it will point to the this of global object
movie.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  const selectedMovieIndex = e.target.selectedIndex;
  const selectedMoviePrice = e.target.value;
  setMovieData(selectedMovieIndex, selectedMoviePrice);
  UpdateUI();
});

//using click event in the whole container and not using forEach
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    UpdateUI();
  }
});

window.onload = function () {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const movieIndex = localStorage.getItem("selectedMovieIndex");
  const moviePrice = +localStorage.getItem("selectedMoviePrice");
  if (selectedSeats.length > 0 && selectedSeats !== null) {
    selectedSeats.forEach((seat) => {
      [...seats1][seat].classList.toggle("selected");
    });
  }
  movie.selectedIndex = movieIndex ?? 0;
  ticketPrice = moviePrice ?? +movie.value;
  UpdateUI();
};
