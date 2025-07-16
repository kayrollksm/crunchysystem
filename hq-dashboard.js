import { createClient } from 'https://esm.sh/@supabase/supabase-js'

// Guna project CrunchySystem kau
const supabaseUrl = 'https://qdy0jtztdyhvjjbdnaq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeTBqdHp0ZHlodmpqYmRuYXE' // ← ganti dengan anon key penuh kalau tak jalan

const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.getElementById("staff-form")
const list = document.getElementById("staff-list")
const status = document.getElementById("status")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const ic_number = document.getElementById("ic_number").value
  const position = document.getElementById("position").value
  const salary = parseFloat(document.getElementById("salary").value)
  const start_date = document.getElementById("start_date").value

  const { error } = await supabase.from('staff').insert([
    { name, ic_number, position, salary, start_date }
  ])

  if (error) {
    status.innerText = "❌ Gagal simpan staff"
    console.error(error)
  } else {
    status.innerText = "✅ Staff berjaya disimpan!"
    form.reset()
    loadStaff()
  }
})

async function loadStaff() {
  const { data, error } = await supabase.from('staff').select('*').order('created_at', { ascending: false })

  list.innerHTML = ''
  data.forEach(staff => {
    const li = document.createElement("li")
    li.innerHTML = `
      ${staff.name} (${staff.position}) 
      <button onclick='generateOfferLetter(${JSON.stringify(staff)})'>🎓 Offer Letter</button>
    `
    list.appendChild(li)
  })
}

window.generateOfferLetter = function(staff) {
  let html = document.getElementById("offer-template").innerHTML
  html = html
    .replace("{{name}}", staff.name)
    .replace("{{ic_number}}", staff.ic_number)
    .replace("{{position}}", staff.position)
    .replace("{{salary}}", staff.salary)
    .replace("{{start_date}}", staff.start_date)

  const el = document.createElement("div")
  el.innerHTML = html
  html2pdf().from(el).save(`Offer_Letter_${staff.name}.pdf`)
}

loadStaff()