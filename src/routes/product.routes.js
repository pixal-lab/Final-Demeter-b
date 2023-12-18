import { Router } from "express";
import { getProducts, getAllProduct, getProduct, getProductsByCategory, getDetailProduct2, checkForDuplicates, createProduct, updateProduct, toggleProductStatus, deleteProduct, getProductById } from '../controllers/product.controller.js';
import { getDetailProduct, createDetailP, deleteDetailProduct } from '../controllers/product.controller.js'; //Detalles
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

router.get('/product', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), getProducts);
router.post('/add_product', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), checkForDuplicates, createProduct);
router.put('/update_product/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), updateProduct);
router.put("/product/toggle/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), toggleProductStatus);
router.delete('/product/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), deleteProduct);
router.get('/product/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), getProductsByCategory);
router.get('/Singleproduct/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), getProduct);
router.get('/AllProducts', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), getAllProduct);
router.get('/getProductById/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), getProductById);

// --------------------- Detalle -------------------------

router.get('/product_detail/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), getDetailProduct)
router.post('/add_details', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), createDetailP)
router.delete('/details/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), deleteDetailProduct)
router.get('/product_detail2/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.PRODUCT
), getDetailProduct2)

export default router;