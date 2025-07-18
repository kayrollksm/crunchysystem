import express from "express"
import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

const router = express.Router()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

router.post("/", async (req, res) => {
  try {
    const {
      nama,
      email,
      no_telefon,
      referral,
      jawatan,
      gaji,
      tarikh_mula
    } = req.body

    // Validasi input
    if (!nama || !email || !no_telefon || !referral) {
      return res.status(400).json({ error: "Semua field diperlukan" })
    }

    // Semak referral ID wujud
    const { data: referrer, error: referrerError } = await supabase
      .from("pendaftar")
      .select("id, referral_count, jumlah_referral")
      .eq("pendaftar_id", referral)
      .single()

    if (referrerError || !referrer) {
      return res.status(400).json({ error: "Referral ID tidak sah" })
    }

    // Generate ID Pendaftar baru
    const newId = crypto.randomUUID().slice(0, 8).toUpperCase()
    const pendaftar_id = `MC${newId}B` // Contoh: MC8A12D9B

    // Masukkan ke table pendaftar
    const { error: insertError } = await supabase.from("pendaftar").insert([
      {
        nama,
        email,
        no_telefon,
        jawatan,
        gaji,
        tarikh_mula,
        pendaftar_id,
        referral,
        status: "Belum Disahkan"
      }
    ])

    if (insertError) throw insertError

    // Update referral count
    const { error: updateError } = await supabase
      .from("pendaftar")
      .update({
        referral_count: (referrer.referral_count || 0) + 1,
        jumlah_referral: (referrer.jumlah_referral || 0) + 1
      })
      .eq("id", referrer.id)

    if (updateError) throw updateError

    res.status(200).json({
      message: "Pendaftaran berjaya!",
      data: { pendaftar_id }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Ralat server!" })
  }
})

export default router
