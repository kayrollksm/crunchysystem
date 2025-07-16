const form = document.getElementById("registerForm");

const params = new URLSearchParams(window.location.search);
const refCode = params.get("ref");
if (refCode) {
  document.getElementById("referral").value = refCode.toUpperCase();
}

function getNextBatch(referralCode) {
  if (!referralCode) return "A";
  const lastChar = referralCode.slice(-1).toUpperCase();
  if (/^[A-Z]$/.test(lastChar)) {
    return String.fromCharCode(lastChar.charCodeAt(0) + 1);
  } else if (/^[A-Z]{2}$/.test(lastChar)) {
    return "AA";
  } else {
    return "A";
  }
}

function generateRandomNumber(length = 5) {
  const max = Math.pow(10, length);
  return Math.floor(Math.random() * max).toString().padStart(length, "0");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = form.nama.value.trim();
  const telefon = form.telefon.value.trim();
  const email = form.email.value.trim();
  const referral = form.referral.value.trim().toUpperCase();

  const batch = getNextBatch(referral);
  const randomNo = generateRandomNumber();
  const pendaftar_id = `MC${randomNo}${batch}`;

  const dataToSend = {
    nama,
    telefon,
    email,
    referral,
    pendaftar_id,
    batch
  };

  const res = await fetch("https://crunchy-api.vercel.app/api/pendaftar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataToSend)
  });

  const result = await res.json();

  if (result.error) {
    alert("❌ Pendaftaran gagal: " + result.error);
  } else {
    localStorage.setItem("pendaftar_id", pendaftar_id);
    localStorage.setItem("email", email);
    localStorage.setItem("nama", nama);
    localStorage.setItem("batch", batch);
    window.location.href = "thank.html";
  }
});
