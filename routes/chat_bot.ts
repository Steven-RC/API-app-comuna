import { Router } from "express";
import { chatBot,obtenerInfoOCR,buscarDocumento } from "../controllers/chat_bot";

const router = Router();

router.post("/chat_bot", chatBot);
router.post("/ocr", obtenerInfoOCR);
router.post("/buscar", buscarDocumento);

export default router;
 