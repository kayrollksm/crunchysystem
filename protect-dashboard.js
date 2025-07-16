// protect-dashboard.js

const role = localStorage.getItem("role")
const user_id = localStorage.getItem("user_id")

if (!role || !user_id) {
  alert("Sila login dahulu.")
  window.location.href = "login.html"
}