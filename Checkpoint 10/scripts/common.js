headerTemplate();
footerTemplate();

//HEADER TEMPLATE FN
function headerTemplate() {
  let headerTemplate = `<a href="index.html">
<img src="assests/images/logo.png" alt="logo" id="logo" />
</a>
<button
id="login-btn"
type="button"
class="btn btn-light"
data-toggle="modal"
data-backdrop="false"
data-target="#loginModal"
>
LOGIN
</button>
<button
id="logout-btn"
type="button"
class="btn btn-light"
style="display:none"
>
LOGOUT
</button>`;
  document.getElementById("headerTemp").innerHTML = headerTemplate;
}

//FOOTER TEMPLATE FN
function footerTemplate() {
  let footerTemplate = `<button
  id="contact-btn"
  type="button"
  class="btn btn-info"
  data-toggle="modal"
  data-target="#contactModal"
>
  Contact Us
</button>
<section id="copyright">&copy; 2020 ROOM SEARCH PVT. LTD.</section>
<section id="social-media-container">
  <a href="https:/www.facebook.com" target="_blank"
    ><img
      src="assests/images/facebook.png"
      class="social-media"
      alt="Facebook"
  /></a>
  <a href="https:/www.instagram.com" target="_blank"
    ><img
      src="assests/images/instagram.png"
      class="social-media"
      alt="Instagram"
  /></a>
  <a href="https:/www.twitter.com" target="_blank"
    ><img
      src="assests/images/twitter.png"
      class="social-media"
      alt="Twitter"
  /></a>
</section>`;
  document.getElementById("footerTemp").innerHTML = footerTemplate;
}

//All Variables
let loginBtn = document.getElementById("login-btn");
let logoutBtn = document.getElementById("logout-btn");
let modalLoginBtn = document.getElementById("modal-login-btn");
let loginModal = document.getElementById("loginModal");
let username = document.getElementById("username");
let password = document.getElementById("password");

//CLOSE MODAL FN
function closeModal() {
  loginModal.style.display = "none";
}

//Setting username and password in localstorage.
localStorage.setItem("useranme", "admin");
localStorage.setItem("password", "admin");

//LOGIN FUNCTION
function userLogin() {
  let usernameValue = username.value;
  let passwordValue = password.value;
  if (usernameValue === "admin" && passwordValue === "admin") {
    localStorage.setItem("isLoggedIn", true);
    alert("Successfully Loggedin");
    logoutBtn.style.display = "flex";
    loginBtn.style.display = "none";
    modalLoginBtn.dataset.dismiss = "modal";
    // closeModal();
  }
}

modalLoginBtn.addEventListener("click", userLogin);

//LOGOUT
logoutBtn.addEventListener("click", function () {
  logoutBtn.style.display = "none";
  loginBtn.style.display = "flex";
  localStorage.removeItem("isLoggedIn");
  modalLoginBtn.dataset.dismiss = "";
  // closeModal();
});

//if reloaded then the button should be logout
window.addEventListener("load", () => {
  if (localStorage.getItem("isLoggedIn")) {
    logoutBtn.style.display = "flex";
    loginBtn.style.display = "none";
  }
});