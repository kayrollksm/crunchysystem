import { createClient } from 'https://esm.sh/@supabase/supabase-js'
import './logout.js'

const supabaseUrl = 'https://qdyojftztydvhyjbdnaq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeW9qZnR6dHlkdmh5amJkbmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjM3MjksImV4cCI6MjA2NzczOTcyOX0.dGPJ3tcv3hcxZHqzDzNJh2l682ykxxK0D3bat_FzvhQ'
const supabase = createClient(supabaseUrl, supabaseKey)

const tableBody = document.getElementById("user-table-body")
const adminName = document.getElementById("admin-name")
const currentUser = localStorage.getItem("name")

adminName.innerText = currentUser || "Admin"

// Muat pengguna dari Supabase
async function loadUsers() {
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error("❌ Gagal ambil data user", error)
    return
  }

  tableBody.innerHTML = ''
  data.forEach(user => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td>
        <select onchange="updateRole('${user.id}', this.value)">
          <option value="staff" ${user.role === 'staff' ? 'selected' : ''}>staff</option>
          <option value="hq" ${user.role === 'hq' ? 'selected' : ''}>hq</option>
          <option value="user" ${user.role === 'user' ? 'selected' : ''}>user</option>
          <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>admin</option>
        </select>
      </td>
    `
    tableBody.appendChild(row)
  })
}

// Update role bila dropdown ditukar
window.updateRole = async function(id, newRole) {
  const { error } = await supabase
    .from('staff')
    .update({ role: newRole })
    .eq('id', id)

  if (error) {
    alert("❌ Gagal tukar role.")
    console.error(error)
  } else {
    alert("✅ Role dikemaskini.")
    loadUsers()
  }
}

loadUsers()