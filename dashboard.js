const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co"; const supabaseKey = "***REMOVED***"; const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => { const pendaftar_id = localStorage.getItem("pendaftar_id"); const nama = localStorage.getItem("nama"); const tier = localStorage.getItem("batch");

if (!pendaftar_id || !nama) { window.location.href = "login.html"; return; }

document.getElementById("nama-user").textContent = nama ?? "-"; document.getElementById("id-user").textContent = pendaftar_id ?? "-"; document.getElementById("tier-user").textContent = tier ?? "-";

// Jumlah referral const { count, error: referralErr } = await supabase .from("pendaftar") .select("id", { count: "exact" }) .eq("referral", pendaftar_id);

document.getElementById("jumlah-referral").textContent = !referralErr ? count ?? 0 : "0";

// Total jualan referral const { data: sales, error: salesErr } = await supabase .from("pembelian") .select("jumlah") .in("pendaftar_id", await getReferralIds(pendaftar_id));

const totalJualan = !salesErr && sales ? sales.reduce((sum, s) => sum + (s.jumlah || 0), 0) : 0; document.getElementById("total-jualan").textContent = totalJualan.toLocaleString();

// Komisen (10% dari jualan referral) const komisen = Math.round(totalJualan * 0.1); document.getElementById("total-komisen").textContent = komisen.toLocaleString();

// Top 10 Referrer const { data: topData, error: topErr } = await supabase .from("pendaftar") .select("nama, total_referral") .order("total_referral", { ascending: false }) .limit(10);

const topList = document.getElementById("top10-list"); topList.innerHTML = "";

if (!topErr && topData.length > 0) { topData.forEach((user, index) => { const li = document.createElement("li"); li.textContent = ${index + 1}. ${user.nama} – ${user.total_referral ?? 0} referral; topList.appendChild(li); }); } else { topList.innerHTML = "<li>Tiada data.</li>"; } });

// Dapatkan semua ID referral async function getReferralIds(pendaftar_id) { const { data, error } = await supabase .from("pendaftar") .select("pendaftar_id") .eq("referral", pendaftar_id);

if (error || !data) return []; return data.map((row) => row.pendaftar_id); }

function logout() { localStorage.clear(); window.location.href = "login.html"; }

