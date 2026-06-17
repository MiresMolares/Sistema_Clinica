import express from "express";

import {
  listarConsultas,
  buscarConsultaPorId,
  criarConsulta,
  finalizarConsulta,
  cancelarConsulta,
  excluirConsulta
} from "../controllers/consultaController.js";

const router = express.Router();

router.get("/", listarConsultas);
router.get("/:id", buscarConsultaPorId);
router.post("/", criarConsulta);

router.patch("/:id/finalizar", finalizarConsulta);
router.patch("/:id/cancelar", cancelarConsulta);

router.delete("/:id", excluirConsulta);

export default router;
