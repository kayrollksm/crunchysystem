// login.js
const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co";
const supabaseKey = "***REMOVED***";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Login form submitted");

  const email = e.target.email.value.trim().toLowerCase();
  const pendaftar_id = e.target.pendaftar_id.value.trim().toUpperCase();

  console.log("Trying login for:", email, pendaftar_id);

  try {
    const { data, error } = await supabase
      .from("pendaftar")
      .select("*")
      .eq("email", email)
      .eq("pendaftar_id", pendaftar_id)
      .single();

    console.log("Result:", data, error);

    if (error || !data) {
      document.getElementById("error-msg").classList.remove("hidden");
      return;
    }

    // Simpan session
    localStorage.setItem("pendaftar_id", data.pendaftar_id);
    localStorage.setItem("email", data.email);
    localStorage.setItem("nama", data.nama ?? "");
    localStorage.setItem("batch", data.batch ?? "");

    console.log("Login success. Redirecting...");

    // Redirect
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error("Login exception:", err);
    document.getElementById("error-msg").textContent = "Ralat berlaku. Sila cuba lagi.";
    document.getElementById("error-msg").classList.remove("hidden");
  }
});