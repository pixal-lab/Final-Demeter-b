import { Router } from "express";

import { getSale, createSale, updateSale, pay, getOneSale, deleteSale, getSaleUp, getSaleDown, getSalesByTimeRange, getSalesByUser } from "../controllers/sale.controller.js";

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

router.get('/sale', getSale);
router.get('/saleUP', getSaleUp);
router.get('/saleDOWN', getSaleDown);
router.get('/getSale/:ID_Sale', getOneSale);
router.get('/getSaleByTime', getSalesByTimeRange);
router.get('/getSaleByuserpc', getSalesByUser);
router.post('/Csale', createSale);
router.put('/UpdateSale', updateSale);
router.put('/paySale', pay);
router.delete('/deleteSale', deleteSale);

export default router;