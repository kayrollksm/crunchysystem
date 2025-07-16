import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://qdy0jtztdyhvjjbdnaq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeTBqdHp0ZHlodmpqYmRuYXE'
const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.getElementById("attendance-form")
const statusMsg = document.getElementById("status")
const attendanceLog = document.getElementById("attendance-log")

form.addEventListener("submit", async function (e) {
  e.preventDefault()

  const user_id = document.getElementById("user_id").value
  const mode = document.getElementById("mode").value
  const selfieFile = document.getElementById("selfie").files[0]

  let locationText = ''
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      locationText = `${latitude},${longitude}`

      const fileName = `${user_id}_${Date.now()}.jpg`
      const { data: storageData, error: uploadError } = await supabase.storage
        .from('attendance-selfie')
        .upload(fileName, selfieFile, {
          contentType: selfieFile.type,
        })

      if (uploadError) {
        statusMsg.innerText = "❌ Gagal upload gambar"
        console.error(uploadError)
        return
      }

      const selfie_url = `https://qdy0jtztdyhvjjbdnaq.supabase.co/storage/v1/object/public/attendance-selfie/${fileName}`

      const { error } = await supabase.from('attendance').insert([
        {
          user_id,
          mode,
          location: locationText,
          selfie_url,
        }
      ])

      if (error) {
        statusMsg.innerText = "❌ Gagal rekod kehadiran"
        console.error(error)
      } else {
        statusMsg.innerText = "✅ Kehadiran berjaya direkod!"
        form.reset()
        loadAttendance()
      }
    })
  } else {
    statusMsg.innerText = "❌ Lokasi tidak disokong"
  }
})

async function loadAttendance() {
  const user_id = document.getElementById("user_id").value
  if (!user_id) return

  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('user_id', user_id)
    .order('timestamp', { ascending: false })

  attendanceLog.innerHTML = ''
  if (data) {
    data.forEach(record => {
      const li = document.createElement('li')
      li.innerHTML = `${record.timestamp} - <strong>${record.mode}</strong><br><small>Lokasi: ${record.location}</small><br><img src="${record.selfie_url}" width="100" />`
      attendanceLog.appendChild(li)
    })
  }
}

document.getElementById("user_id").addEventListener("change", loadAttendance)