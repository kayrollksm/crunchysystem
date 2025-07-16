document.getElementById("register-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;

  const dataToSend = {
    endpoint: "pendaftar",
    method: "POST",
    data: {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      referral: form.referral.value
    }
  };

  const response = await fetch("https://script.google.com/macros/s/AKfycbzxPzIv82xlP0W3PLrtv4Xa9HNquD7A81sZn7-eYklzW1fflMndPzDIlVxP58_lQS9qQg/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend)
  });

  const result = await response.json();
  console.log("Berjaya:", result);

  document.getElementById("status-msg").innerText = "Berjaya daftar!";
  form.reset();
});
