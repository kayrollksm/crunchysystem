const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co";
const supabaseKey = "***REMOVED***";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
  const pendaftar_id = localStorage.getItem("pendaftar_id");
  const nama = localStorage.getItem("nama");
  const batch = localStorage.getItem("batch");

  if (!pendaftar_id || !nama) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("nama-user").textContent = nama ?? "-";
  document.getElementById("id-user").textContent = pendaftar_id ?? "-";
  document.getElementById("batch-user").textContent = batch ?? "-";

  const { count, error: referralErr } = await supabase
    .from("pendaftar")
    .select("id", { count: "exact" })
    .eq("referral", pendaftar_id);

  document.getElementById("jumlah-referral").textContent = referralErr ? "0" : count;

  const { data: topData, error: topErr } = await supabase
    .from("pendaftar")
    .select("nama, total_referral")
    .order("total_referral", { ascending: false })
    .limit(10);

  const topList = document.getElementById("top10-list");
  topList.innerHTML = "";

  if (!topErr && Array.isArray(topData) && topData.length > 0) {
    topData.forEach((user, index) => {
      const namaRef = user.nama ?? `Referrer ${index + 1}`;
      const jumlah = user.total_referral ?? 0;
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${namaRef} – ${jumlah} referral`;
      topList.appendChild(li);
    });
  } else {
    topList.innerHTML = "<li>Tiada data.</li>";
  }
});

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}