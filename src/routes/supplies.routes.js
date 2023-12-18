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

router.get("/supplies", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIES
), getSupplies);
router.post("/supplies", authRequired, checkForDuplicates, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIES
), createSupplies);
router.put("/supplies/disable/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIES
), disableSupplies);
router.put("/supplies/update/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIES
), updateSupplies);
router.put("/supplies/updateUnitSupplieById/:id/:quantity", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIES
), updateUnitSupplieByIdAndSend);
router.delete("/supplies/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIES
), deleteSupplies);
router.get("/supplies/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIES
), getSupplie);

export default router;