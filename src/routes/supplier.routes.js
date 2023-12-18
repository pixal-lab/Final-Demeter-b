import { Router } from 'express';

import { getSupplier, getSupplie, createSupplier, disableSupplier, updateSupplier, deleteSupplier, getSupplierByState } from '../controllers/Suppliere.controller.js';

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

router.get("/supplier", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIER
), getSupplier);
router.get("/supplierByState", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIER
), getSupplierByState);
router.get("/supplier/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIER
), getSupplie);
router.post("/supplier", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIER
), createSupplier);
router.put("/supplier/disable/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIER
), disableSupplier);
router.put("/supplier/update/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIER
), updateSupplier);
router.delete("/supplier/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIER
), deleteSupplier);

export default router;