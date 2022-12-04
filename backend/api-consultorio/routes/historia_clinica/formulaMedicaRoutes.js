import express from "express";
const router = express.Router();
import { agregar, listar, eliminar, editar, listarUno } from "../../controllers/historia_clinica/formulaMedicaController.js";
router.get("/", listar);
router.get("/:id", listarUno);
router.post("/", agregar);
router.put("/:id", editar);
router.delete("/:id", eliminar);

//rutas publicas

export default router;