// dashboard.js

const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeW9qZnR6dHlkdmh5amJkbmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjM3MjksImV4cCI6MjA2NzczOTcyOX0.dGPJ3tcv3hcxZHqzDzNJh2l682ykxxK0D3bat_FzvhQ";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user || !user.pendaftar_id) {
    window.location.href = "login.html";
    return;
  }

  // Paparkan info pengguna
  document.getElementById("userName").textContent = user.nama ?? "-";
  document.getElementById("userId").textContent = user.pendaftar_id ?? "-";
  document.getElementById("userTier").textContent = user.tier ?? "-";
  document.getElementById("userRef").textContent = user.referral ?? "-";
  document.getElementById("userTotalSale").textContent = user.total_sale?.toFixed(2) ?? "0.00";
  document.getElementById("userTotalCommission").textContent = user.total_commission?.toFixed(2) ?? "0.00";
  document.getElementById("userJumlahReferral").textContent = user.jumlah_referral ?? "0";

  // Link referral
  const refLink = `${window.location.origin}/register.html?ref=${user.pendaftar_id}`;
  document.getElementById("referralLink").value = refLink;

  // Top 10 Referrer
  const { data: topList, error: topErr } = await supabase
    .from("pendaftar")
    .select("nama, jumlah_referral, total_sale")
    .order("jumlah_referral", { ascending: false })
    .limit(10);

  const topUl = document.getElementById("top10-list");
  topUl.innerHTML = "";

  if (!topErr && topList) {
    topList.forEach((u, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${u.nama} - ${u.jumlah_referral ?? 0} referral - RM${u.total_sale?.toFixed(2) ?? "0.00"}`;
      topUl.appendChild(li);
    });
  } else {
    topUl.innerHTML = "<li>Tiada data.</li>";
  }
});

// Logout
function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}