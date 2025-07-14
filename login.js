const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co";
const supabaseKey = "***REMOVED***";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  if (!form) {
    alert("Form login tidak dijumpai!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim().toLowerCase();
    const pendaftar_id = form.pendaftar_id.value.trim().toUpperCase();

    try {
      const { data, error } = await supabase
        .from("pendaftar")
        .select("*")
        .eq("email", email)
        .eq("pendaftar_id", pendaftar_id)
        .single();

      if (error || !data) {
        document.getElementById("error-msg").classList.remove("hidden");
        alert("❌ Login gagal. Sila semak maklumat.");
        return;
      }

      localStorage.setItem("pendaftar_id", data.pendaftar_id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("nama", data.nama);
      localStorage.setItem("batch", data.batch);

      // ✅ HARD REDIRECT via anchor click
      const anchor = document.createElement("a");
      anchor.href = "dashboard.html";
      anchor.click();

      // Fallback (in case above skipped)
      window.location.href = "dashboard.html";

    } catch (err) {
      alert("❌ Ralat sistem. Sila cuba lagi.");
      console.error("Login Error:", err);
    }
  });
});