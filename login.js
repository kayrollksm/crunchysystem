const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co";
const supabaseKey = "***REMOVED***";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Tunggu semua elemen dah ready
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value.trim().toLowerCase();
    const pendaftar_id = form.pendaftar_id.value.trim().toUpperCase();

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

    localStorage.setItem("pendaftar_id", data.pendaftar_id);
    localStorage.setItem("email", data.email);
    localStorage.setItem("nama", data.nama);
    localStorage.setItem("batch", data.batch);

    // Confirmed redirect
    window.location.replace("dashboard.html");
  });
});