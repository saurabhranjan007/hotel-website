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