"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_bot_1 = require("../controllers/chat_bot");
const router = (0, express_1.Router)();
router.post("/chat_bot", chat_bot_1.chatBot);
router.post("/ocr", chat_bot_1.obtenerInfoOCR);
router.post("/buscar", chat_bot_1.buscarDocumento);
exports.default = router;
//# sourceMappingURL=chat_bot.js.map