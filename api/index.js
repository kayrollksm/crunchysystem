import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import daftarRoute from "./routes/daftar.js"
import belianRoute from "./routes/belian.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 10000

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/daftar", daftarRoute)
app.use("/api/belian", belianRoute)

// Root route
app.get("/", (req, res) => {
  res.send("Crunchy API is running 🚀")
})

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
