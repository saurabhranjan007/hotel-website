//view more button functionality
let cityCardsTwo = document.getElementById("city-cards-2");
let viewMoreButton = document.getElementById("view-more-btn");

viewMoreButton.addEventListener("click", function () {
  if (cityCardsTwo.dataset.value === "view-less") {
    cityCardsTwo.dataset.value = "view-more";
    cityCardsTwo.style.display = "none";
    viewMoreButton.innerHTML = "View More";
  } else {
    cityCardsTwo.dataset.value = "view-less";
    cityCardsTwo.style.display = "flex";
    viewMoreButton.innerHTML = "View Less";
  }
});

var cityImgDiv = document.querySelectorAll(".city-image");

//This will pass on the city you clicked
for (var i = 0; i < cityImgDiv.length; i++) {
  cityImgDiv[i].addEventListener("click", function (event) {
    event.preventDefault();
    let cityName = event.target.closest(".city-image").getAttribute("id");
    window.location.href = `list.html?city=${cityName}`;
  });
}

/////////////////////////////////////AutoComplete API////////////////////////////////////
let cityInputEl = document.getElementById("search-bar-input");
let counter = 0;
let datalist;

const fetchCityNames = function () {
  // console.log("1");
  let cityNameInput;
  let searchBarDiv = document.getElementById("search-bar");

  if (counter !== 0) {
    let datalistToRemove = document.querySelectorAll(".search-city-input");
    datalistToRemove.forEach((element) => {
      element.remove();
    });
  }

  if (cityInputEl.value.length >= 3) {
    cityNameInput = cityInputEl.value;
    // console.log(cityNameInput);
    // console.log(counter++);
    counter++;
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let resObjArr = JSON.parse(this.responseText).data
          .Typeahead_autocomplete.results;
        let filteredArr = resObjArr.filter((element) => {
          return (
            element.detailsV2 !== undefined &&
            element.detailsV2.placeType !== undefined &&
            element.detailsV2.placeType === "CITY"
          );
        });
        // console.log(resObjArr);
        // console.log(filteredArr);

        datalist = document.createElement("div");
        datalist.classList.add("search-city-input-container");
        filteredArr.forEach((element) => {
          let autoCompleteCity = element.detailsV2.names.name;
          let result = autoCompleteCity.replaceAll(" ", "%20");

          let remove1 = document.querySelectorAll(".search-city-input");
          remove1.forEach((element) => {
            element.remove();
          });
          datalist.innerHTML += `<div class="search-city-input"><a class="auto-complete-options" id=${result}>
                                ${autoCompleteCity}</a><div>`;
        });
        searchBarDiv.append(datalist);

        //eventhandler for datalists
        let datalistForClick = document.querySelectorAll(".search-city-input");
        for (var i = 0; i < datalistForClick.length; i++) {
          datalistForClick[i].addEventListener("click", function (event) {
            event.preventDefault();
            cityInputEl.value = "";
            let cityName;
            if (event.target.children[0]) {
              cityName = event.target.children[0].id;
            } else {
              cityName = event.target.getAttribute("id");
            }
            window.location.href = `list.html?city=${cityName}`;
          });
        }
      }
    });

    xhr.open(
      "GET",
      `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${cityNameInput}`
    );
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader(
      "x-rapidapi-key",
      "5d7e7a4d9amshb3a02aac0340606p125c2cjsn5957a56ef5c1"
    );
    xhr.send(data);
  }
};

const debounce = function (fn, d) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, d);
  };
};

const useDebounce = debounce(fetchCityNames, 50);
cityInputEl.addEventListener("keyup", useDebounce);