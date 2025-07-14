const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co";
const supabaseKey = "***REMOVED***";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const errorBox = document.getElementById("error-msg");

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
        errorBox.classList.remove("hidden");
        return;
      }

      localStorage.setItem("pendaftar_id", data.pendaftar_id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("nama", data.nama);
      localStorage.setItem("batch", data.batch);

      window.location.href = "dashboard.html";
      
    } catch (err) {
      alert("❌ Ralat sistem. Sila cuba lagi.");
      console.error("Login Error:", err);
    }
  });

  // Auto-hide error bila user type balik
  form.email.addEventListener("input", () => errorBox.classList.add("hidden"));
  form.pendaftar_id.addEventListener("input", () => errorBox.classList.add("hidden"));
});