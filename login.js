const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co";
const supabaseKey = "***REMOVED***";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM loaded. Script running.");

  const form = document.getElementById("login-form");

  if (!form) {
    alert("❌ Form login tidak dijumpai!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim().toLowerCase();
    const pendaftar_id = form.pendaftar_id.value.trim().toUpperCase();

    console.log("📨 Trying login for:", email, pendaftar_id);

    const { data, error } = await supabase
      .from("pendaftar")
      .select("*")
      .eq("email", email)
      .eq("pendaftar_id", pendaftar_id)
      .single();

    console.log("🧾 Supabase response:", data, error);

    if (error || !data) {
      document.getElementById("error-msg").classList.remove("hidden");
      alert("❌ Login gagal. Maklumat tidak dijumpai.");
      return;
    }

    localStorage.setItem("pendaftar_id", data.pendaftar_id);
    localStorage.setItem("email", data.email);
    localStorage.setItem("nama", data.nama);
    localStorage.setItem("batch", data.batch);

    alert("✅ Login berjaya! Akan redirect ke dashboard...");
    window.location.href = "dashboard.html";
  });
});