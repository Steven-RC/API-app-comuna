"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ressetPassword_1 = require("../controllers/ressetPassword");
const router = (0, express_1.Router)();
router.post('/reset', ressetPassword_1.resetPassword);
exports.default = router;
//# sourceMappingURL=ressetPassword.js.map