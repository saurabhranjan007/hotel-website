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