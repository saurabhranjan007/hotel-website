let url = window.location.href;
let cityName = url.split("?")[1].split("=")[1];

//LOADER
let loader = document.getElementById("loader-div");

////////////////////////////////////////////////API/////////////////////////////////////////////////
//This will give hotel list from a particular city
const data = null;
const xhr = new XMLHttpRequest();
xhr.withCredentials = false;
let resultObjArr = new Array();
let filteredResultObjArr = new Array();

function filterHotels(hotels) {
  return !(hotels.rating === undefined && hotels.address === undefined);
}

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    let arr = JSON.parse(this.responseText).data;
    for (var i = 0; i < arr.length; i++) {
      resultObjArr.push(arr[i].result_object);
    }
    filteredResultObjArr = resultObjArr.filter(filterHotels);
    // console.log(filteredResultObjArr);
    hotelDetailsTemplate(filteredResultObjArr);
    loader.style.display = "none";
  }
});

xhr.open(
  "GET",
  `https://travel-advisor.p.rapidapi.com/locations/search?query=${cityName}`
);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader(
  "x-rapidapi-key",
  "5d7e7a4d9amshb3a02aac0340606p125c2cjsn5957a56ef5c1"
);

xhr.send(data);

let listView = document.getElementById("list-view");
let hotelContainer;
let clickedHotelName;
let hotelId;

const hotelDetailsTemplate = function (hotelsArray) {
  //   console.log(hotelsArray);
  const str = hotelsArray
    .map((object) => {
      return `<a href="#"><section class="hotel-image-container">
    <img
      src="${object.photo.images.medium.url}"
      class="hotel-image"
      alt="${object.name}"
    />
    <div class="hotel-details">
      <h3>${object.name}</h3>
      <p>${object.rating}<span class="fa fa-star checked"></span></p>
      <p>${object.address}</p>
    </div>
    </section></a>`;
    })
    .join("");
  listView.innerHTML = str;
  hotelContainer = document.getElementsByClassName("hotel-image-container");

  for (var i = 0; i < hotelContainer.length; i++) {
    hotelContainer[i].addEventListener("click", function (event) {
      event.preventDefault();
      clickedHotelName = event.target.closest(".hotel-image-container")
        .childNodes[3].childNodes[1].textContent;
      for (let a = 0; a < filteredResultObjArr.length; a++) {
        // console.log(filteredResultObjArr[a].name);
        if (filteredResultObjArr[a].name === clickedHotelName) {
          hotelId = filteredResultObjArr[a].location_id;
          break;
        }
      }
      window.location.href = `detail.html?id=${hotelId}`;
    });
  }
};

// LEAFLET JS LIBRARY FOR MAPS
//////////////////////////////////////
//new
///
let listViewLi = document.getElementsByClassName("tab-item")[0];
let mapViewLi = document.getElementsByClassName("tab-item")[1];
let mapViewLink = document.getElementById("mapView-link");
let listViewLink = document.getElementById("listView-link");

let Leaflet = L.map("map");

//event listener for listview
listViewLink.addEventListener("click", function (event) {
  event.preventDefault();

  mapViewLi.classList.remove("active");
  listViewLi.classList.add("active");

  document.getElementById("list-view").style.display = "block";
  document.getElementById("map").style.display = "none";
});

//event listener for mapview
mapViewLink.addEventListener("click", function (event) {
  event.preventDefault();

  mapViewLi.classList.add("active");
  listViewLi.classList.remove("active");

  document.getElementById("list-view").style.display = "none";
  document.getElementById("map").style.display = "block";
  console.log(resultObjArr[0].latitude, resultObjArr[0].longitude);

  var map = Leaflet.setView(
    [resultObjArr[0].latitude, resultObjArr[0].longitude],
    13
  );
  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  filteredResultObjArr.forEach((element) => {
    if (element.latitude !== undefined && element.longitude !== undefined) {
      L.marker([element.latitude, element.longitude])
        .addTo(map)
        .bindPopup(L.popup({}))
        .setPopupContent(
          `<p class="popup-para">${element.name}</p><a class="popuplink" href = "detail.html?id=${element.location_id}">Book Hotel</a>`
        )
        .openPopup();
    }
  });
});