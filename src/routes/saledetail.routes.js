import { Router } from "express";

import { createSaleDetail, getDetails, createManyDetails, lotUpd, deleteSaleDetail } from "../controllers/saledetail.controller.js";

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

router.post('/Csaledetail', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), createSaleDetail);
router.post('/CManyDetails', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), createManyDetails);
router.get('/details/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), getDetails);
router.put('/update', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), lotUpd)
router.delete('/deleteDetailS/:ID_SaleDetail', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), deleteSaleDetail)

export default router;