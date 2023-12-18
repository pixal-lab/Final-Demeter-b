import { Router } from 'express';

import { getshoppingDetail, getShopDetail, createShopping } from '../controllers/shoppingdetail.controller.js'

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

router.get('/shoppingdetail', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), getshoppingDetail);
router.get('/shoppingdetail/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), getShopDetail);
router.post('/shoppingdetail', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), createShopping);

export default router;