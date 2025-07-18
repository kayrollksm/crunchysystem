import express from "express"
import cors from "cors"
import daftarCalon from "./routes/daftar.js"
import getCalon from "./routes/get-calon.js"
import getSurat from "./routes/get-surat.js"

const app = express()

// ✅ Paling basic tapi pasti berfungsi
app.use(cors())
app.options("*", cors()) // manual OPTIONS fix

// JSON parser
app.use(express.json())

// Routes
app.post("/api/daftar-calon", daftarCalon)
app.get("/api/get-calon", getCalon)
app.get("/api/get-surat", getSurat)

// Root
app.get("/", (req, res) => {
  res.send("CrunchySystem API ready 🚀")
})

// Start
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
