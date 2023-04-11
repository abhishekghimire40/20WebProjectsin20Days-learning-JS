"use-strict";
const currencyFirst = document.getElementById("select1Curr");
const currencyFirstValue = document.getElementById("Curr1value");
const currencySecond = document.getElementById("select2Curr");
const currencySecondValue = document.getElementById("Curr2value");
const swap = document.getElementById("swap");
const rate = document.getElementById("currRate");
const apiKey = "c43281f3101d9ed03261bb19";

currencyFirst.innerHTML = "";
currencySecond.innerHTML = "";
let URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

const fetchData = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Htpp error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Data was not returned");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addOptions = function (el, key) {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = key;
  el.appendChild(option);
  if (el === currencySecond && key === "EUR") {
    option.selected = true;
  }
};

const displayRate = function (data) {
  rate.textContent = `1 ${currencyFirst.value} = ${
    data[currencySecond.value]
  } ${currencySecond.value}`;
};

const displayData = function () {
  const url = `${URL}USD`;
  fetchData(url).then((data) => {
    for (const key in data["conversion_rates"]) {
      addOptions(currencyFirst, key);
      addOptions(currencySecond, key);
    }

    currencyFirstValue.value = data["conversion_rates"]["USD"];
    currencySecondValue.value = data["conversion_rates"]["EUR"];
    displayRate(data["conversion_rates"]);
  });
};

const getValue = function () {
  const val1 = currencyFirstValue.value ? currencyFirstValue.value : 0;
  const val2 = currencySecondValue.value ? currencySecondValue.value : 0;
  return [val1, val2];
};

const calculate = function (inputNo) {
  const url = `${URL}${currencyFirst.value}`;
  fetchData(url)
    .then((data) => {
      const rates = data["conversion_rates"];
      const [val1, val2] = getValue();
      if (inputNo === "first") {
        currencySecondValue.value = (
          val1 * +rates[currencySecond.value]
        ).toFixed(4);
      } else if (inputNo === "second") {
        currencyFirstValue.value = (
          (1 / +rates[currencySecond.value]) *
          val2
        ).toFixed(4);
      }
      displayRate(rates);
    })
    .catch((error) => console.log(error));
};

displayData();
currencyFirstValue.addEventListener("input", () => {
  calculate("first");
});

currencySecondValue.addEventListener("input", () => {
  calculate("second");
});

currencyFirst.addEventListener("change", () => {
  calculate("first");
});

currencySecond.addEventListener("change", () => {
  calculate("second");
});

swap.addEventListener("click", () => {
  [currencyFirst.value, currencySecond.value] = [
    currencySecond.value,
    currencyFirst.value,
  ];
  calculate("first");
});

// ===============================================================

// const fetchData = async function () {
//   try {
//     url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Http error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     if (!data) {
//       throw new Error(`No data was returned!`);
//     }

//     for (const [key, value] of Object.entries(data[`conversion_rates`])) {
//       addOptions(currencyFirst, key, value);
//       addOptions(currencySecond, key, value);
//     }
//     currencyFirstValue.value = currencyFirst.value;
//     currencySecondValue.value = currencySecond.value;
//     return data["conversion_rates"];
//   } catch (error) {
//     console.log(error);
//   }
// };
