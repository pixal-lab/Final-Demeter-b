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

router.post('/Csaledetail', createSaleDetail);
router.post('/CManyDetails', createManyDetails);
router.get('/details/:id', getDetails);
router.put('/update', lotUpd)
router.delete('/deleteDetailS/:ID_SaleDetail', deleteSaleDetail)

export default router;