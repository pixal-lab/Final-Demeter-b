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

router.get('/getSaleByTimepc', getSalesByDate);
router.get('/shoppingByDate', getShoppingByDate);
router.get('/getSaleByuserpc', getSalesByUser);
router.get('/detailsBP', countAllDetailsByProduct);
router.get('/shoppingdetailExp', getMostExpensiveSupply);

export default router;
