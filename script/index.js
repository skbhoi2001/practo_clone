import { homebody, header } from "../component/export_files.js"

const body_import = document.getElementById("body_import")
body_import.innerHTML = homebody()
const header_import = document.getElementById("header_import")
header_import.innerHTML = header()
//slideshow
var slideIndex = 0
showSlides()

function showSlides() {
  var i
  var slides = document.getElementsByClassName("mySlides")
  var dots = document.getElementsByClassName("dot")
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }
  slideIndex++
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "")
  }
  slides[slideIndex - 1].style.display = "block"
  dots[slideIndex - 1].className += " active"
  setTimeout(showSlides, 2000) // Change image every 2 seconds
}

// ketan
var name_para = document.getElementById("name-para")
var mobile_para = document.getElementById("mobile-number-para")

let profile_hide_visible = 1
var profile_section = document.getElementById("profile-main-div")

var logout_button = document.getElementById("logoutme")

var login_signup_button = document.getElementById("login-button")

logout_button.addEventListener("click", () => {
  handle_logout()
})
login_signup_button.addEventListener("click", () => {
  login_button()
})

fetch("http://localhost:1212/loginData")
  .then(function (response) {
    return response.json()
  })
  .then(function (response) {
    if (response.length !== 0) {
      var login_signup_button = document.getElementById(
        "after-otp-login-button"
      )
      login_signup_button.innerHTML = response[0].user_name
    }
  })

function login_button() {
  console.log("hello")
  fetch("http://localhost:1212/loginData")
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      if (response.length == 0) {
        window.location.assign("http://127.0.0.1:5500/pages/login.html")
      } else if (profile_hide_visible % 2 !== 0) {
        login_signup_button.innerHTML = response[0].user_name
        name_para.innerHTML = response[0].user_name
        mobile_para = response[0].mobile_number
        profile_section.style.visibility = "visible"
        profile_hide_visible++
      } else {
        profile_section.style.visibility = "hidden"
        profile_hide_visible++
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

function handle_logout() {
  console.log("hello")
  fetch("http://localhost:1212/loginData", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
}
