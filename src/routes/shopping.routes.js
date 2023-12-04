import { Router } from 'express';
import { getShopping, getShop, createShopping, disableShop, createMultipleShopping, getShopingAndShopingDetails, getShopingByProvider, getShoppingAndSuppliesBySupplierId } from '../controllers/Shopping.controller.js'

const router = Router();

router.get('/shopping', getShopping);
router.get('/shopping/:id', getShop);
router.post('/shopping', createShopping);
router.post('/multpleShopping', createMultipleShopping);
router.get('/getShopingByProvider', getShopingByProvider);
router.get('/getShoppingAndSuppliesBySupplierId/:id/', getShoppingAndSuppliesBySupplierId);
router.get('/getShopingAndShopingDetails', getShopingAndShopingDetails);
router.put("/shopping/disable/:id", disableShop);


export default router;