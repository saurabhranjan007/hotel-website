let payNowBtn = document.getElementById("pay-now-btn");

function payNowBtnEnable() {
  if (localStorage.getItem("isLoggedIn")) {
    payNowBtn.disabled = false;
  }
}

function payNowBtnDisable() {
  if (!localStorage.getItem("isLoggedIn")) {
    payNowBtn.disabled = true;
  }
}

//for paynow button enable and disable
setInterval(payNowBtnEnable, 50);
setInterval(payNowBtnDisable, 50);

//alert for paynow
payNowBtn.addEventListener("click", function () {
  alert("Hi your booking is successfull !!");
});

////////////////////////////////////////////////////////////////////////////////
let url = window.location.href;
let urlObject = new URL(url);
let parameters = urlObject.searchParams;

let hotelId = parameters.get("hotel_id");
let noOfAdults = parameters.get("adults");
let fromDate = parameters.get("fromDate");
let toDate = parameters.get("toDate");
let nameOfCus = parameters.get("name");
let totalPrice = parameters.get("totalPrice");
let noOfNights = (Date.parse(toDate) - Date.parse(fromDate)) / 86400000;

const name_of_cus = document.getElementById("nameOfCus");
const no_of_adults = document.getElementById("noOfAdults");
const checkin_date = document.getElementById("checkInDate");
const checkout_date = document.getElementById("checkOutDate");
const total_price = document.getElementById("totalPrice");
const tariff_breakdown = document.getElementById("tariffBreakdown");

name_of_cus.innerHTML = `<span class="headers">Name: </span>${nameOfCus}`;
no_of_adults.innerHTML = `<span class="headers">Number of Adults: </span> ${noOfAdults}`;
checkin_date.innerHTML = `<span class="headers">Check-in Date: </span> ${fromDate}`;
checkout_date.innerHTML = `<span class="headers">Check-out Date: </span> ${toDate}`;
total_price.innerHTML = `<span class="headers">Tariff Amount: </span> Rs. ${totalPrice}`;
tariff_breakdown.innerHTML = `<span class="headers">Tariff Breakdown: </span> Rs. 1000 x ${noOfAdults} Adults
x ${noOfNights} Nights`;

/////////////////////////////////////////////////////////////////////////////////
let hotelImageEl = document.getElementById("hotel-img");
let hotelName = document.getElementById("hotel-name");
let hotelAddress = document.getElementById("hotel-address");
let hotelRanking = document.getElementById("hotel-ranking");
let resultObjArr;

/////////////////////////////////////API To GET DETAILS OF THE HOTEL/////////////////////////////////////////
//LOADER
let loader = document.getElementById("loader-div");

const data = null;
const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    // console.log(JSON.parse(this.responseText).data);
    resultObjArr = JSON.parse(this.responseText).data[0];
    hotelName.textContent = resultObjArr.name;
    hotelAddress.textContent = resultObjArr.address;
    hotelRanking.textContent = resultObjArr.ranking;
    hotelImageEl.setAttribute("src", resultObjArr.photo.images.medium.url);
    loader.style.display = "none";
  }
});

xhr.open(
  "GET",
  `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelId}`
);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader(
  "x-rapidapi-key",
  "5d7e7a4d9amshb3a02aac0340606p125c2cjsn5957a56ef5c1"
);

xhr.send(data);