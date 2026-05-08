import express from "express"
import cors from "cors"
import path from "path"
import { existsSync } from "fs"
import { fileURLToPath } from "url"
import "./config/loadEnv.js"
import recipeRouter from "./routes/recipe.js"

const app = express()
const PORT = process.env.PORT || 8000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.resolve(__dirname, "../dist")

app.use(cors())
app.use(express.json())

if (existsSync(distPath)) {
    app.use(express.static(distPath))
}

app.use("/api/recipe", recipeRouter)

app.get("/", (req, res) => {
    if (existsSync(distPath)) {
        res.sendFile(path.join(distPath, "index.html"))
        return
    }

    res.json({ message: "Chef Claude API is running" })
})

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
