import { Router } from 'express';

import { getSupplies, getSupplie, checkForDuplicates, createSupplies, disableSupplies, updateSupplies, deleteSupplies, updateUnitSupplieByIdAndSend } from '../controllers/supplies.controller.js';

import { authRequired } from '../middlewares/validateToken.js'
import ModuleValidationMiddleware from '../middlewares/ModuleValidation.middleware.js'

const router = Router();

const moduleValidation = new ModuleValidationMiddleware(
    ({
        res,
        error
    }) => {
        res.json({
            message: error.message
        })
    }
)

router.get("/supplies", getSupplies);
router.post("/supplies", createSupplies);
router.put("/supplies/disable/:id", disableSupplies);
router.put("/supplies/update/:id", updateSupplies);
router.put("/supplies/updateUnitSupplieById/:id/:quantity", updateUnitSupplieByIdAndSend);
router.delete("/supplies/:id", deleteSupplies);
router.get("/supplies/:id", getSupplie);

export default router;