import express from "express"
import cors from "cors"
import daftarCalon from "./routes/daftar.js"
import getCalon from "./routes/get-calon.js"
import getSurat from "./routes/get-surat.js"

const app = express()

// ✅ Stable CORS for GitHub Pages
app.use(cors({
  origin: "https://kayrollksm.github.io",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}))

// JSON parser
app.use(express.json())

// Routes
app.post("/api/daftar-calon", daftarCalon)
app.get("/api/get-calon", getCalon)
app.get("/api/get-surat", getSurat)

app.get("/", (req, res) => {
  res.send("CrunchySystem API ready 🚀")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
