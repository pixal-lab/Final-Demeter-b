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

router.get('/product', getProducts);
router.post('/add_product', checkForDuplicates, createProduct);
router.put('/update_product/:id', updateProduct);
router.put("/product/toggle/:id", toggleProductStatus);
router.delete('/product/:id', deleteProduct);
router.get('/product/:id', getProductsByCategory);
router.get('/Singleproduct/:id', getProduct);
router.get('/AllProducts', getAllProduct);
router.get('/getProductById/:id', getProductById);

// --------------------- Detalle -------------------------

router.get('/product_detail/:id', getDetailProduct)
router.post('/add_details', createDetailP)
router.delete('/details/:id', deleteDetailProduct)
router.get('/product_detail2/:id', getDetailProduct2)

export default router;