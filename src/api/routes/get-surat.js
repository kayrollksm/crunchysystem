// /api/get-surat.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)


export default async function handler(req, res) {
  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing ID' })

  const { data, error } = await supabase
    .from('calon_pekerja')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(200).json(data)
}
