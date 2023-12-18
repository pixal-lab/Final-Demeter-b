import { Router } from 'express';

import { getSalesByDate, getShoppingByDate, getSalesByUser, countAllDetailsByProduct, getMostExpensiveSupply } from '../controllers/dashboard.controller.js'
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

router.get('/getSaleByTimepc', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.DASHBOARD
), getSalesByDate);
router.get('/shoppingByDate', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.DASHBOARD
), getShoppingByDate);
router.get('/getSaleByuserpc', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.DASHBOARD
), getSalesByUser);
router.get('/detailsBP', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.DASHBOARD
), countAllDetailsByProduct);
router.get('/shoppingdetailExp', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.DASHBOARD
), getMostExpensiveSupply);

export default router;
