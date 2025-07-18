// /api/daftar-calon.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { nama, telefon, jawatan, gaji, tarikh_mula } = req.body
  if (!nama || !telefon || !jawatan || !gaji || !tarikh_mula) {
    return res.status(400).json({ error: 'Maklumat tidak lengkap' })
  }

  const { data, error } = await supabase
    .from('calon_pekerja')
    .insert([{ nama, telefon, jawatan, gaji, tarikh_mula, status: 'belum_disemak' }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(200).json(data)
}
