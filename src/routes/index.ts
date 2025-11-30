import { Router } from "express";
import cors from "cors"
import categoryRoutes from "../modules/category/category.routes.js"
const globalRoutes: Router = Router()


const corsConfig = {
    origin: ["http://localhost:3000"]
}
globalRoutes.use(cors(corsConfig))

globalRoutes.use("/quizcategory", categoryRoutes)

export default globalRoutes