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

router.get('/shopping', getShopping);
router.get('/shopping/:id', getShop);
router.post('/shopping', createShopping);
router.post('/multpleShopping', createMultipleShopping);
router.get('/getShopingByProvider', getShopingByProvider);
router.get('/getShoppingAndSuppliesBySupplierId/:id', getShoppingAndSuppliesBySupplierId);
router.get('/getShoppingAndSuppliesBySupplierIdAndDate/:id/:date', getShoppingAndSuppliesBySupplierIdAndDate);
router.get('/getShopingAndShopingDetails', getShopingAndShopingDetails);
router.get('/getShoppingAndSuppliesBySupplierIdAndDateTime/:id/:date', getShoppingAndSuppliesBySupplierIdAndDateTime);
router.put("/shopping/disable/:id", disableShop);

export default router;