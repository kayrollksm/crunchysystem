import express from "express"
import daftarCalon from "./routes/daftar.js"
import getCalon from "./routes/get-calon.js"
import getSurat from "./routes/get-surat.js"

const app = express()

// ✅ Manual CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*") // Atau tukar ke "https://kayrollksm.github.io" untuk lebih ketat
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  next()
})

// ✅ JSON parser
app.use(express.json())

// ✅ Betul: mount router dengan .use()
app.use("/api/daftar-calon", daftarCalon)
app.use("/api/get-calon", getCalon)
app.use("/api/get-surat", getSurat)

// ✅ Root route
app.get("/", (req, res) => {
  res.send("CrunchySystem API ready 🚀")
})

// ✅ Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
