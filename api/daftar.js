import express from 'express'
import { createClient } from '@supabase/supabase-js'

const app = express()
const PORT = process.env.PORT || 3000

// Supabase credentials dari environment Render
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

app.use(express.json())

app.post('/api/daftar', async (req, res) => {
  const { nama, email, phone, referral } = req.body

  if (!nama || !email || !phone) {
    return res.status(400).json({ error: 'Sila isi semua maklumat wajib.' })
  }

  try {
    const { data, error } = await supabase
      .from('pendaftar')
      .insert([{ nama, email, phone, referral }])

    if (error) {
      throw error
    }

    res.status(200).json({ message: 'Pendaftaran berjaya!', data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})