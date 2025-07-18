import express from "express"
import cors from "cors"
import daftarCalon from "./routes/daftar.js"
import getCalon from "./routes/get-calon.js"
import getSurat from "./routes/get-surat.js"

const app = express()

// ✅ CORS betul-betul config
app.use(cors({
  origin: "https://kayrollksm.github.io", // domain GitHub Pages
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: false // kalau tak perlu cookie/session
}))

// Middleware JSON
app.use(express.json())

// Routes
app.post("/api/daftar-calon", daftarCalon)
app.get("/api/get-calon", getCalon)
app.get("/api/get-surat", getSurat)

// Root check
app.get("/", (req, res) => {
  res.send("CrunchySystem API ready 🚀")
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
