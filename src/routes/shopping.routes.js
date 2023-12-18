import { Router } from 'express';

import { getShopping, getShop, createShopping, disableShop, createMultipleShopping, getShopingAndShopingDetails, getShopingByProvider, getShoppingAndSuppliesBySupplierId, getShoppingAndSuppliesBySupplierIdAndDate, getShoppingAndSuppliesBySupplierIdAndDateTime } from '../controllers/shopping.controller.js'

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

router.get('/shopping', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), getShopping);
router.get('/shopping/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), getShop);
router.post('/shopping', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), createShopping);
router.post('/multpleShopping', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), createMultipleShopping);
router.get('/getShopingByProvider', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), getShopingByProvider);
router.get('/getShoppingAndSuppliesBySupplierId/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), getShoppingAndSuppliesBySupplierId);
router.get('/getShoppingAndSuppliesBySupplierIdAndDate/:id/:date', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), getShoppingAndSuppliesBySupplierIdAndDate);
router.get('/getShopingAndShopingDetails', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), getShopingAndShopingDetails);
router.get('/getShoppingAndSuppliesBySupplierIdAndDateTime/:id/:date', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), getShoppingAndSuppliesBySupplierIdAndDateTime);
router.put("/shopping/disable/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SHOPPING
), disableShop);

export default router;