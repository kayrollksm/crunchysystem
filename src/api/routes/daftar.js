import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default async function daftarCalon(req, res) {
  // Tambah CORS header manual
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  // Handle preflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") return res.status(405).end()

  const { nama, no_telefon, jawatan, gaji, tarikh_mula, email, referral } = req.body

  if (!nama || !no_telefon || !jawatan || !gaji || !tarikh_mula || !email || !referral) {
    return res.status(400).json({ error: "Maklumat tidak lengkap" })
  }

  const { data, error } = await supabase
    .from("calon_pekerja")
    .insert([
      {
        nama,
        no_telefon,
        jawatan,
        gaji,
        tarikh_mula,
        email,
        referral,
        status: "Belum Disahkan",
      },
    ])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })

  res.status(200).json({
    message: "Pendaftaran berjaya!",
    data: { pendaftar_id: data.id, nama: data.nama },
  })
}
