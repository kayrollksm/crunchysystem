import express from "express"
import { createClient } from "@supabase/supabase-js"

const router = express.Router()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Tambah middleware CORS terus kat sini
router.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  res.status(200).end()
})

router.post("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")

  const { nama, telefon, jawatan, gaji, tarikh_mula } = req.body

  if (!nama || !telefon || !jawatan || !gaji || !tarikh_mula) {
    return res.status(400).json({ error: "Maklumat tidak lengkap" })
  }

  const { data, error } = await supabase
    .from("calon_pekerja")
    .insert([{ nama, telefon, jawatan, gaji, tarikh_mula, status: "belum_disemak" }])
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })

  res.status(200).json({ message: "Berjaya!", data })
})

export default router
