import "dotenv/config"
import express from "express"
import type { Express } from "express"
import globalRoutes from "./routes/index.js"

const buildServer = (): Express => {
const server = express()
server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server successfuly builded"
    })
})

server.use("/api/v1", globalRoutes)
return server
}

export default buildServer