import { Router } from "express";
import authControllers from "./auth.controllers";

const routes = Router()
routes.get("/user", authControllers.getUsers)

export default routes