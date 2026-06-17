import express from "express";

import {
  listarPacientes,
  buscarPacientePorId,
  criarPaciente,
  atualizarPaciente,
  excluirPaciente
} from "../controllers/pacienteController.js";

const router = express.Router();

router.get("/", listarPacientes);
router.get("/:id", buscarPacientePorId);
router.post("/", criarPaciente);
router.put("/:id", atualizarPaciente);
router.delete("/:id", excluirPaciente);

export default router;