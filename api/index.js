import express from 'express'
import { createClient } from '@supabase/supabase-js'

const app = express()
const PORT = process.env.PORT || 3000

// Env key dari Render
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

app.use(express.json())

// Endpoint: /api/daftar
app.post('/api/daftar', async (req, res) => {
  const { nama, email, no_telefon, referral } = req.body

  if (!nama || !email || !no_telefon) {
    return res.status(400).json({ error: 'Maklumat tidak lengkap.' })
  }

  try {
    const { data, error } = await supabase
      .from('pendaftar')
      .insert([{ nama, email, no_telefon, referral }])

    if (error) throw error

    res.status(200).json({ message: 'Pendaftaran berjaya!', data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Endpoint: /api/belian
app.post('/api/belian', async (req, res) => {
  const { pendaftar_id, jumlah } = req.body

  if (!pendaftar_id || !jumlah) {
    return res.status(400).json({ error: 'Maklumat pembelian tidak lengkap.' })
  }

  try {
    const { data, error } = await supabase
      .from('pembelian')
      .insert([{ pendaftar_id, jumlah }])

    if (error) throw error

    res.status(200).json({ message: 'Pembelian berjaya direkod!', data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})