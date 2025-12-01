import { Router } from "express";
import authControllers from "./auth.controllers.js"; 
const authroutes = Router();

authroutes.get("/get", authControllers.getAuth);

export default authroutes;
