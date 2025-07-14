// dashboard.js
const supabaseUrl = "https://mbtovkknnkynbixvqxtp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1idG92a2tubmt5bmJpeHZxeHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzkzNDcsImV4cCI6MjAyODI1NTM0N30.CvGQ5oStajMRP6IO1Bh0VFE0reK0Kkb-SMDtubwnFCg";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Ambil ID dari localStorage
const pendaftar_id = localStorage.getItem("pendaftar_id");
const nama = localStorage.getItem("nama");
const batch = localStorage.getItem("batch");

if (!pendaftar_id) {
  window.location.href = "login.html";
}

// Papar nama & batch
document.getElementById("nama-user").textContent = nama;
document.getElementById("id-user").textContent = pendaftar_id;
document.getElementById("batch-user").textContent = batch;

// Dapatkan jumlah referral
async function kiraReferralSaya() {
  const { count, error } = await supabase
    .from("pendaftar")
    .select("id", { count: "exact" })
    .eq("referral_id", pendaftar_id);

  document.getElementById("jumlah-referral").textContent = count ?? 0;
}

kiraReferralSaya();

// Papar Top 10
async function paparTop10() {
  const { data, error } = await supabase
    .from("pendaftar")
    .select("nama, total_referral")
    .order("total_referral", { ascending: false })
    .limit(10);

  const topList = document.getElementById("top10-list");
  topList.innerHTML = "";

  data.forEach((user, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${user.nama} – ${user.total_referral} referral`;
    topList.appendChild(li);
  });
}

paparTop10();