var calculateTotalPrice = function () {
  let form = document.getElementById("form");
  let adult = document.getElementById("adult").value;
  let name = document.getElementById("name").value;
  let fromDate = document.getElementById("fromDate").valueAsNumber;
  let toDate = document.getElementById("toDate").valueAsNumber;
  let totalPrice = document.getElementById("price");

  let price = 1000;
  let toDateEl = document.getElementById("toDate");
  let fromDateEl = document.getElementById("fromDate");

  toDateEl.min = fromDateEl.value;
  if (
    adult >= 1 &&
    name != "" &&
    fromDate > 0 &&
    toDate > 0 &&
    toDate > fromDate
  ) {
    let days = (toDate - fromDate) / 86400000;
    let priceToDisplay = price * adult * days;
    totalPrice.value = "Rs. " + priceToDisplay;
  }
};

form.addEventListener("input", calculateTotalPrice);