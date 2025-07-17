import express from "express"
import { createClient } from "@supabase/supabase-js"

const router = express.Router()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

router.post("/", async (req, res) => {
  const { nama, email, no_telefon, referral } = req.body

  if (!nama || !email || !no_telefon) {
    return res.status(400).json({ error: "Sila isi semua maklumat wajib." })
  }

  try {
    const { data: insertedData, error } = await supabase
      .from("pendaftar")
      .insert([{ nama, email, no_telefon, referral }])
      .select() // ambil data yg dimasukkan

    if (error) {
      console.error("Supabase error:", error)
      return res.status(500).json({ error: "Gagal mendaftar." })
    }

    res.status(200).json({
      message: "Pendaftaran berjaya!",
      data: insertedData[0] // return data yg didaftar
    })
  } catch (err) {
    console.error("Server error:", err)
    res.status(500).json({ error: "Ralat server." })
  }
})

export default router
