import express from "express";

import {
  listarMedicos,
  buscarMedicoPorId,
  criarMedico,
  atualizarMedico,
  excluirMedico
} from "../controllers/medicoController.js";

const router = express.Router();

router.get("/", listarMedicos);
router.get("/:id", buscarMedicoPorId);
router.post("/", criarMedico);
router.put("/:id", atualizarMedico);
router.delete("/:id", excluirMedico);

export default router;