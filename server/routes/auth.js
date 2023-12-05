import { Router } from "express";

//controllers
import { register, login, me } from "../controllers/auth.js";
//импортируем chechAuth для расширения запроса на http://localhost:3002/api/auth/me
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//registration
//http://localhost:3002/api/auth/register
router.post("/register", register);

//login
//http://localhost:3002/api/auth/login
router.post("/login", login);

//get me
//http://localhost:3002/api/auth/me
// вставляем checkAuth до контроллера me
router.get("/me", checkAuth, me);

export default router;
