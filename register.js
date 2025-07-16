const form = document.getElementById("register-form");
const statusMsg = document.getElementById("status-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = form.nama.value;
  const telefon = form.telefon.value;
  const email = form.email.value;
  const kod_referral = form.kod_referral.value;

  try {
    const response = await fetch("https://delicate-chaja-e44d0e1.netlify.app/.netlify/functions/pendaftar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama, telefon, email, kod_referral }),
    });

    const data = await response.json();

    if (data.success) {
      statusMsg.textContent = "✅ Pendaftaran berjaya!";
      form.reset();
    } else {
      statusMsg.textContent = "❌ Pendaftaran gagal. Sila cuba lagi.";
    }
  } catch (error) {
    console.error("Ralat:", error);
    statusMsg.textContent = "⚠️ Ralat sistem. Sila cuba sebentar lagi.";
  }
});
