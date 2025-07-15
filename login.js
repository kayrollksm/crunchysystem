// login.js

const supabaseUrl = "https://qdyojftztydvhyjbdnaq.supabase.co";
const supabaseKey = "***REMOVED***";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const pendaftarId = document.getElementById('pendaftar_id').value.trim().toUpperCase();

  if (!email || !pendaftarId) {
    alert('Sila isi semua ruangan.');
    return;
  }

  const { data, error } = await supabase
    .from('pendaftar')
    .select('*')
    .eq('email', email)
    .eq('pendaftar_id', pendaftarId)
    .single();

  if (error || !data) {
    alert('❌ Login gagal. Sila semak email dan ID.');
    return;
  }

  // Simpan ke sessionStorage
  sessionStorage.setItem('user', JSON.stringify(data));
  sessionStorage.setItem('pendaftar_id', pendaftarId);

  // Redirect
  window.location.href = 'dashboard.html';
});