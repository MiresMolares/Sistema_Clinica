import express from "express";

import {
  listarEspecialidades,
  buscarEspecialidadePorId,
  criarEspecialidade,
  atualizarEspecialidade,
  excluirEspecialidade
} from "../controllers/especialidadeController.js";

const router = express.Router();

router.get("/", listarEspecialidades);
router.get("/:id", buscarEspecialidadePorId);
router.post("/", criarEspecialidade);
router.put("/:id", atualizarEspecialidade);
router.delete("/:id", excluirEspecialidade);

export default router;