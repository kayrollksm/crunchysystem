 import { createClient } from "https://esm.sh/@supabase/supabase-js";

// Supabase connection
const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co";
const supabaseKey = "***REMOVED***";
const supabase = createClient(supabaseUrl, supabaseKey);

// Dapatkan info user dari localStorage
const pendaftarID = localStorage.getItem("pendaftarID");
const userNama = localStorage.getItem("userNama");

// Kalau tak login, redirect
if (!pendaftarID) {
  window.location.href = "login.html";
}

// Papar nama & ID
document.getElementById("user-nama").innerText = userNama;
document.getElementById("user-id").innerText = pendaftarID;
document.getElementById("referral-link").innerText = `https://kayrollksm.github.io/crunchysystem/register.html?ref=${pendaftarID}`;

// Kira dan paparkan statistik
async function loadStats() {
  // Dapatkan semua referral direct
  const { data: referralList, error: refError } = await supabase
    .from("pendaftar")
    .select("*")
    .eq("referral", pendaftarID);

  if (refError) {
    alert("Gagal dapatkan referral: " + refError.message);
    return;
  }

  const totalReferral = referralList.length;
  const totalSale = referralList.reduce((sum, r) => sum + (r.jumlah || 0), 0);

  // Papar data
  document.getElementById("total-referral").innerText = totalReferral;
  document.getElementById("total-sale").innerText = "RM" + totalSale;

  // Kira tier
  let tier = 1;
  if (totalSale >= 10000 && totalReferral >= 10) tier = 5;
  else if (totalSale >= 8000 && totalReferral >= 5) tier = 4;
  else if (totalSale >= 5000 && totalReferral >= 3) tier = 3;
  else if (totalSale >= 3000) tier = 2;

  // Kira komisen %
  const komisenList = { 1: 10, 2: 13, 3: 15, 4: 18, 5: 20 };
  const komisen = komisenList[tier];

  document.getElementById("tier-level").innerText = "Tier " + tier;
  document.getElementById("commission").innerText = komisen + "%";
}

loadStats();

// Logout function
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("pendaftarID");
  localStorage.removeItem("userNama");
  window.location.href = "login.html";
});