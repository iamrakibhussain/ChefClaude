import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { existsSync } from "fs"
import { fileURLToPath } from "url"
import recipeRouter from "./routes/recipe.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.resolve(__dirname, "../dist")
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173"
].filter(Boolean)

if (existsSync(distPath)) {
    app.use(express.static(distPath))
}

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
            return
        }

        callback(new Error("Not allowed by CORS"))
    }
}))
app.use(express.json())


app.use("/api/recipe", recipeRouter)

// React SPA refresh/navigation should still return the app shell.
app.get("/", (req, res) => {
    if (existsSync(distPath)) {
        res.sendFile(path.join(distPath, "index.html"))
        return
    }

    res.json({ message: "Chef Claude API is running" })
})

// Any other route should return a real 404 instead of the home page.
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
