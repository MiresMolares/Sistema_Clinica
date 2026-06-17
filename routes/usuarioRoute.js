import { Router } from "express";
import { listarUsuarios, criarUsuario, atualizarUsuario, eliminarUsuario } from "../controllers/usuarioController.js";
import { validarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", validarToken, listarUsuarios);
router.post("/", validarToken, criarUsuario);
router.put("/:id", validarToken, atualizarUsuario);
router.delete("/:id", validarToken, eliminarUsuario);

export default router;