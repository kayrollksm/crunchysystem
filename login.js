// login.js
const supabaseUrl = "https://xxxx.supabase.co"; // GANTI dgn url sebenar
const supabaseKey = "eyJhbGciOi..."; // GANTI dgn anon key sebenar

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target.email.value.trim().toLowerCase();
  const pendaftar_id = e.target.pendaftar_id.value.trim().toUpperCase();

  const { data, error } = await supabase
    .from("pendaftar")
    .select("*")
    .eq("email", email)
    .eq("pendaftar_id", pendaftar_id)
    .single();

  if (error || !data) {
    document.getElementById("error-msg").classList.remove("hidden");
    return;
  }

  // Simpan dalam localStorage (atau sessionStorage)
  localStorage.setItem("pendaftar_id", data.pendaftar_id);
  localStorage.setItem("email", data.email);
  localStorage.setItem("nama", data.nama); // kalau nak guna dalam dashboard

  // Redirect ke dashboard
  window.location.href = "dashboard.html";
});