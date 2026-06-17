// import express from "express";
// const router = express.Router()
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
import { Router } from "express";
import { login, registrar } from "../controllers/authController.js";

const router = Router();

router.post("/registrar", registrar);
router.post("/login", login);

export default router;

