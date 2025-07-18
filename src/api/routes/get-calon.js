import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default async function getCalon(req, res) {
  // Tambah CORS header
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "GET") return res.status(405).end()

  const { data, error } = await supabase
    .from("calon_pekerja")
    .select("id, nama, no_telefon, jawatan, status")

  if (error) return res.status(500).json({ error: error.message })

  res.status(200).json({ data })
}
