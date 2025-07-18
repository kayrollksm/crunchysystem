import express from "express"
import { createClient } from "@supabase/supabase-js"

const router = express.Router()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

router.post("/", async (req, res) => {
  const { nama, no_telefon, jawatan, gaji, tarikh_mula, email, referral } = req.body

  if (!nama || !no_telefon || !jawatan || !gaji || !tarikh_mula || !email || !referral) {
    return res.status(400).json({ error: "Maklumat tidak lengkap" })
  }

  const { data, error } = await supabase
    .from("calon_pekerja")
    .insert([{
      nama,
      no_telefon,
      jawatan,
      gaji,
      tarikh_mula,
      email,
      referral,
      status: "Belum Disahkan"
    }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })

  res.status(200).json({ message: "Calon berjaya didaftarkan", data })
})

export default router
