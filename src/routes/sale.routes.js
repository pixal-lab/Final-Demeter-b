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

router.get('/sale', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), getSale);
router.get('/saleUP', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), getSaleUp);
router.get('/saleDOWN', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), getSaleDown);
router.get('/getSale/:ID_Sale', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), getOneSale);
router.get('/getSaleByTime', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), getSalesByTimeRange);
router.get('/getSaleByuserpc', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), getSalesByUser);
router.post('/Csale', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), createSale);
router.put('/UpdateSale', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), updateSale);
router.put('/paySale', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), pay);
router.delete('/deleteSale', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SALES
), deleteSale);

export default router;