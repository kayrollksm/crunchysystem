export default async function handler(req, res) {
  // Tambah CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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
