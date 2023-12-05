import { Router } from "express";

//controllers
import { register, login, me } from "../controllers/auth.js";

const router = new Router();

//registration
//http://localhost:3002/api/auth/register
router.post("/register", register);

//login
//http://localhost:3002/api/auth/login
router.post("/login", login);

//get me
//http://localhost:3002/api/auth/me
router.get("/me", me);

export default router;
