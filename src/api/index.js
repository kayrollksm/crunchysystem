import express from "express"
import daftarCalon from "./routes/daftar.js" // ✅ maintain import ini
import getCalon from "./routes/get-calon.js"
import getSurat from "./routes/get-surat.js"

const app = express()

// ✅ Manual CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  next()
})

app.use(express.json())

// ✅ Update route
app.post("/api/daftar", daftarCalon)
app.get("/api/get-calon", getCalon)
app.get("/api/get-surat", getSurat)

app.get("/", (req, res) => {
  res.send("CrunchySystem API ready 🚀")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
