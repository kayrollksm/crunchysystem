import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://qdy0jtztdyhvjjbdnaq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeTBqdHp0ZHlodmpqYmRuYXE'
const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.getElementById("cuti-form")
const statusMsg = document.getElementById("status")
const cutiLog = document.getElementById("cuti-log")

form.addEventListener("submit", async function (e) {
  e.preventDefault()

  const user_id = document.getElementById("user_id").value
  const jenis = document.getElementById("jenis").value
  const tarikh = document.getElementById("tarikh").value
  const sebab = document.getElementById("sebab").value

  const { error } = await supabase.from('cuti').insert([
    {
      user_id,
      jenis,
      tarikh,
      sebab,
      status: 'Pending'
    }
  ])

  if (error) {
    statusMsg.innerText = "❌ Gagal mohon cuti"
    console.error(error)
  } else {
    statusMsg.innerText = "✅ Permohonan cuti dihantar!"
    form.reset()
    loadCuti()
  }
})

async function loadCuti() {
  const user_id = document.getElementById("user_id").value
  if (!user_id) return

  const { data, error } = await supabase
    .from('cuti')
    .select('*')
    .eq('user_id', user_id)
    .order('tarikh', { ascending: false })

  cutiLog.innerHTML = ''
  if (data) {
    data.forEach(record => {
      const li = document.createElement('li')
      li.innerHTML = `${record.tarikh} - <strong>${record.jenis}</strong><br>
        Sebab: ${record.sebab}<br>
        Status: <strong>${record.status}</strong>`
      cutiLog.appendChild(li)
    })
  }
}

document.getElementById("user_id").addEventListener("change", loadCuti)