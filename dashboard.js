const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co";
const supabaseKey = "***REMOVED***";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
  const pendaftar_id = localStorage.getItem("pendaftar_id");
  const nama = localStorage.getItem("nama");
  const batch = localStorage.getItem("batch");

  // 🔐 Redirect jika tiada login
  if (!pendaftar_id || !nama) {
    window.location.href = "login.html";
    return;
  }

  // 👤 Papar data pengguna
  document.getElementById("nama-user").textContent = nama ?? "-";
  document.getElementById("id-user").textContent = pendaftar_id ?? "-";
  document.getElementById("batch-user").textContent = batch ?? "-";

  // 📊 Jumlah referral
  const { count, error: referralErr } = await supabase
    .from("pendaftar")
    .select("id", { count: "exact" })
    .eq("referral", pendaftar_id);

  document.getElementById("jumlah-referral").textContent =
    !referralErr ? count ?? 0 : "0";

  // 🏆 Papar Top 10 Referrer
  const { data: topData, error: topErr } = await supabase
    .from("pendaftar")
    .select("nama, total_referral")
    .order("total_referral", { ascending: false })
    .limit(10);

  const topList = document.getElementById("top10-list");
  topList.innerHTML = "";

  if (!topErr && topData?.length > 0) {
    topData.forEach((user, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${user.nama} – ${user.total_referral ?? 0} referral`;
      topList.appendChild(li);
    });
  } else {
    topList.innerHTML = "<li>Tiada data.</li>";
  }

  // 📦 Paparkan senarai pembelian
  await loadPembelian();

  // 🛒 Simpan pembelian baru
  const pembelianForm = document.getElementById("form-pembelian");
  if (pembelianForm) {
    pembelianForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const namaProduk = document.getElementById("nama-produk").value.trim();
      const jumlah = parseInt(document.getElementById("jumlah").value.trim());

      if (!namaProduk || isNaN(jumlah)) {
        alert("❌ Sila isi semua maklumat dengan betul.");
        return;
      }

      const { error } = await supabase.from("pembelian").insert([
        { pendaftar_id, nama_produk: namaProduk, jumlah }
      ]);

      if (error) {
        alert("❌ Gagal simpan pembelian: " + error.message);
      } else {
        alert("✅ Pembelian berjaya disimpan!");
        pembelianForm.reset();
        await loadPembelian();
      }
    });
  }
});

// 📦 Load senarai pembelian pengguna semasa
async function loadPembelian() {
  const pendaftar_id = localStorage.getItem("pendaftar_id");
  const list = document.getElementById("senarai-pembelian");
  list.innerHTML = "<li>Memuatkan data...</li>";

  const { data, error } = await supabase
    .from("pembelian")
    .select("*")
    .eq("pendaftar_id", pendaftar_id)
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    list.innerHTML = "<li>Tiada rekod pembelian.</li>";
    return;
  }

  list.innerHTML = "";
  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `🛒 ${item.nama_produk} - ${item.jumlah} unit`;
    list.appendChild(li);
  });
}

// 🔓 Logout
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}