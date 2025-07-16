import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://qdy0jtztdyhvjjbdnaq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeTBqdHp0ZHlodmpqYmRuYXE'
const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.getElementById("login-form")
const statusMsg = document.getElementById("status")

form.addEventListener("submit", async function (e) {
  e.preventDefault()

  const user_id = document.getElementById("user_id").value.trim()

  const { data, error } = await supabase
    .from('staff') // tukar ke 'users' kalau pakai table lain
    .select('*')
    .eq('id', user_id)
    .single()

  if (error || !data) {
    statusMsg.innerText = "❌ ID tidak dijumpai."
    return
  }

  // Simpan dalam localStorage
  localStorage.setItem("user_id", data.id)
  localStorage.setItem("role", data.role)
  localStorage.setItem("name", data.name)

  // Redirect ikut role
  switch (data.role) {
    case 'hq':
      window.location.href = 'hq-dashboard.html'
      break
    case 'staff':
      window.location.href = 'staff-dashboard.html'
      break
    case 'admin':
      window.location.href = 'admin-panel.html'
      break
    case 'user':
      window.location.href = 'user-dashboard.html'
      break
    default:
      statusMsg.innerText = "❌ Role tidak dikenalpasti."
  }
})