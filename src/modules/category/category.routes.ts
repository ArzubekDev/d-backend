import { Router } from "express";
import categoryControllers from "./category.controllers.js";

const routes: Router = Router()

routes.get("/category", categoryControllers.getCategory)
routes.post("/category", categoryControllers.postCategory)
routes.delete("/category/:id", categoryControllers.delCategory)

routes.get("/question", categoryControllers.getQuestion)
routes.post("/question", categoryControllers.addQuestion)

export default routes
