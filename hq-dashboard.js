import { createClient } from 'https://esm.sh/@supabase/supabase-js'
import './logout.js'

const supabaseUrl = 'https://qdyojftztydvhyjbdnaq.supabase.co'
const supabaseKey = '***REMOVED***'
const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.getElementById('staff-form')
const statusMsg = document.getElementById('status')
const tableBody = document.getElementById('user-table-body')

// Simpan staff baru
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value
  const ic_number = document.getElementById('ic_number').value
  const position = document.getElementById('position').value
  const salary = parseFloat(document.getElementById('salary').value)
  const start_date = document.getElementById('start_date').value

  const { error } = await supabase
    .from('staff')
    .insert([{ name, ic_number, position, salary, start_date, role: 'staff' }])

  if (error) {
    console.error(error)
    statusMsg.innerText = "❌ Gagal simpan staff"
  } else {
    statusMsg.innerText = "✅ Berjaya simpan staff"
    form.reset()
    loadStaff()
  }
})

// Papar senarai staff
async function loadStaff() {
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error("Gagal load staff", error)
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

// Tukar role staff
window.updateRole = async function(id, newRole) {
  const { error } = await supabase
    .from('staff')
    .update({ role: newRole })
    .eq('id', id)

  if (error) {
    alert("❌ Gagal kemas kini role.")
    console.error(error)
  } else {
    alert("✅ Role telah dikemaskini.")
    loadStaff()
  }
}

loadStaff()