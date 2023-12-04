import { Router } from 'express';
import { getSuppliessByCategory, getSupplies, getSupplie, checkForDuplicates, createSupplies, disableSupplies, updateSupplies, deleteSupplies, updateUnitSupplieByIdAndSend } from '../controllers/supplies.controller.js';

const router = Router();

router.get("/supplies", getSupplies);
router.get("/supplies/category/:id", getSuppliessByCategory);
router.post("/supplies", checkForDuplicates, createSupplies);
router.put("/supplies/disable/:id", disableSupplies);
router.put("/supplies/update/:id", updateSupplies);
router.put("/supplies/updateUnitSupplieById/:id/:quantity", updateUnitSupplieByIdAndSend);
router.delete("/supplies/:id", deleteSupplies);
router.get("/supplies/:id", getSupplie);

export default router;