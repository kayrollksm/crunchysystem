// login.js
const supabaseUrl = "https://mbtovkknnkynbixvqxtp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1idG92a2tubmt5bmJpeHZxeHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzkzNDcsImV4cCI6MjAyODI1NTM0N30.CvGQ5oStajMRP6IO1Bh0VFE0reK0Kkb-SMDtubwnFCg";

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

  // Simpan data dalam localStorage
  localStorage.setItem("pendaftar_id", data.pendaftar_id);
  localStorage.setItem("email", data.email);
  localStorage.setItem("nama", data.nama);
  localStorage.setItem("batch", data.batch);

  // Redirect ke dashboard
  window.location.href = "dashboard.html";
});