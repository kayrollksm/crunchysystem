import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Invalid method' })
  }

  const { pendaftar_id, jumlah } = req.body

  if (!pendaftar_id || !jumlah) {
    return res.status(400).json({ message: 'Missing data' })
  }

  const { data, error } = await supabase.from('pembelian').insert([
    {
      pendaftar_id,
      jumlah,
    },
  ])

  if (error) {
    return res.status(500).json({ message: 'Failed to insert', error })
  }

  res.status(200).json({ message: 'Success', data })
}
