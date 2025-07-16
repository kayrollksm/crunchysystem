import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://qdy0jtztdyhvjjbdnaq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeTBqdHp0ZHlodmpqYmRuYXE'
const supabase = createClient(supabaseUrl, supabaseKey)

const userInput = document.getElementById("user_id")
const gajiLog = document.getElementById("gaji-log")

userInput.addEventListener("change", loadSlip)

async function loadSlip() {
  const user_id = userInput.value
  if (!user_id) return

  const { data, error } = await supabase
    .from('slip_gaji')
    .select('*')
    .eq('user_id', user_id)
    .order('tarikh', { ascending: false })

  gajiLog.innerHTML = ''
  if (data && data.length > 0) {
    data.forEach(record => {
      const div = document.createElement('div')
      div.style.border = '1px solid #ccc'
      div.style.padding = '10px'
      div.style.marginBottom = '10px'
      div.innerHTML = `
        <strong>Tarikh:</strong> ${record.tarikh}<br/>
        <strong>Gaji Pokok:</strong> RM${record.gaji_pokok}<br/>
        <strong>OT:</strong> RM${record.ot}<br/>
        <strong>Potongan:</strong> RM${record.potongan}<br/>
        <strong>Total Dibayar:</strong> <strong>RM${record.total}</strong>
      `
      gajiLog.appendChild(div)
    })
  } else {
    gajiLog.innerHTML = '<p>Tiada slip gaji dijumpai.</p>'
  }

  if (error) {
    console.error('Gagal ambil data slip gaji', error)
  }
}