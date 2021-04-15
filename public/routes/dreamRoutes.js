"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dreamsController_1 = require("../controllers/dreamsController");
const router = express_1.default.Router();
// Get, Post, Delete for /dreams route
router.route('/')
    .get(dreamsController_1.dreams_getAll)
    .post(dreamsController_1.dreams_postAll)
    .delete(dreamsController_1.dreams_deleteAll);
// Get, Patch, Delete for specific dream
router.route('/:id')
    .get(dreamsController_1.dreams_getOne)
    .patch(dreamsController_1.dreams_patchOne)
    .delete(dreamsController_1.dreams_deleteOne);
module.exports = router;
