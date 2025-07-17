import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qdyojftztydvhyjbdnaq.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const data = req.body

  const { error } = await supabase.from('pembelian').insert([data])

  if (error) return res.status(400).json({ error: error.message })

  res.status(200).json({ message: 'Pembelian berjaya direkod!' })
}
