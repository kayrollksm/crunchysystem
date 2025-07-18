// /api/update-calon.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { id } = req.body
  if (!id) return res.status(400).json({ error: 'Missing ID' })

  const { error } = await supabase
    .from('calon_pekerja')
    .update({ status: 'diterima' })
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  res.status(200).json({ success: true })
}
