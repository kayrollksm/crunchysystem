import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { pendaftar_id, jumlah } = req.body

  if (!pendaftar_id || !jumlah) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  // 1. Simpan pembelian
  const { data: pembelian, error: pembelianError } = await supabase
    .from('pembelian')
    .insert([{ pendaftar_id, jumlah }])

  if (pembelianError) {
    return res.status(500).json({ error: pembelianError.message })
  }

  // 2. Dapatkan maklumat pendaftar & batch
  const { data: pendaftarData, error: pendaftarError } = await supabase
    .from('pendaftar')
    .select('id, referral, batch, tier')
    .eq('pendaftar_id', pendaftar_id)
    .single()

  if (pendaftarError || !pendaftarData) {
    return res.status(404).json({ error: 'Pendaftar not found' })
  }

  const referrer_id = pendaftarData.referral
  const batch = pendaftarData.batch

  // 3. Cari tier & kadar komisen direct
  const tierRateMap = {
    1: 0.10,
    2: 0.13,
    3: 0.15,
    4: 0.18,
    5: 0.20
  }

  // 4. Dapatkan tier referrer
  const { data: referrerData, error: referrerError } = await supabase
    .from('pendaftar')
    .select('pendaftar_id, tier')
    .eq('pendaftar_id', referrer_id)
    .single()

  if (!referrerData) {
    return res.status(200).json({ message: 'Pembelian berjaya (tanpa referral)' })
  }

  const referrerTier = referrerData.tier || 1
  const komisen = jumlah * (tierRateMap[referrerTier] || 0.10)

  // 5. Simpan ke referral_stats
  await supabase.from('referral_stats').insert([
    {
      referrer_id,
      referred_id: pendaftar_id,
      batch,
      jumlah,
      komisen
    }
  ])

  return res.status(200).json({
    message: 'Pembelian & komisen berjaya!',
    komisen
  })
}
