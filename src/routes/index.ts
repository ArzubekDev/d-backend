import { Router } from "express";
import cors from "cors"
import categoryRoutes from "../modules/category/category.routes.js"
// import authroutes from "../modules/auth/auth.routes.js";

const globalRoutes: Router = Router()


const corsConfig = {
    origin: ["http://localhost:3000"]
}
globalRoutes.use(cors(corsConfig))

globalRoutes.use("/quizcategory", categoryRoutes)
// globalRoutes.use("/auth", authroutes)
export default globalRoutes