import { Router } from 'express';
import { getShopping, getShop, createShopping, disableShop, createMultipleShopping, getShopingAndShopingDetails, getShopingByProvider, getShoppingAndSuppliesBySupplierId, getShoppingAndSuppliesBySupplierIdAndDate, getShoppingAndSuppliesBySupplierIdAndDateTime } from '../controllers/shopping.controller.js'

const router = Router();

router.get('/shopping', getShopping);
router.get('/shopping/:id', getShop);
router.post('/shopping', createShopping);
router.post('/multpleShopping', createMultipleShopping);
router.get('/getShopingByProvider', getShopingByProvider);
router.get('/getShoppingAndSuppliesBySupplierId/:id', getShoppingAndSuppliesBySupplierId);
router.get('/getShoppingAndSuppliesBySupplierIdAndDateTime/:id/:date', getShoppingAndSuppliesBySupplierIdAndDateTime);
router.get('/getShoppingAndSuppliesBySupplierIdAndDate/:id/:date', getShoppingAndSuppliesBySupplierIdAndDate);
router.get('/getShopingAndShopingDetails', getShopingAndShopingDetails);
router.put("/shopping/disable/:id", disableShop);


export default router;