"use-strict";
const movie = document.getElementById("movie");
const seats = document.querySelectorAll(".seatno");
const totalSeats = document.getElementById("totalSeats");
const price = document.getElementById("price");

// const seatObj = {};
// let reservedSeat = 0;
// let currMovie = +movie.value;
// seats.forEach(function (seat) {
//   const val = seat.textContent;
//   seatObj[val] = true;
//   seat.onclick = function () {
//     const newval = seat.textContent;
//     if (seatObj[newval]) {
//       seatObj[newval] = false;
//       seat.style.color = "red";
//       reservedSeat += 1;
//     } else {
//       seatObj[newval] = true;
//       seat.style.color = "black";
//       reservedSeat = reservedSeat > 0 ? reservedSeat - 1 : 0;
//     }
//     totalSeats.textContent = reservedSeat;
//     price.textContent = reservedSeat * currMovie;
//   };
// });

// movie.onchange = function () {
//   currMovie = this.value;
//   totalSeats.textContent = reservedSeat;
//   price.textContent = reservedSeat * currMovie;
// };

seats.forEach((seat) => {
  seat.onclick = function () {
    console.log(seat.dataset.value);
  };
});
