import { Router } from "express";
import { getProducts,getAllProduct,getProduct, getProductsByCategory, checkForDuplicates, createProduct, updateProduct, toggleProductStatus, deleteProduct } from '../controllers/product.controller.js';
import { getDetailProduct, createDetailP, deleteDetailProduct } from '../controllers/product.controller.js'; //Detalles
import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

router.get('/product', getProducts);
router.post('/add_product', checkForDuplicates, createProduct);
router.put('/update_product/:id', updateProduct);
router.put("/product/toggle/:id", toggleProductStatus);
router.delete('/product/:id', deleteProduct);
router.get('/product/:id', getProductsByCategory);
router.get('/Singleproduct/:id', getProduct);
router.get('/AllProducts', getAllProduct);

//Detalles
router.get('/product_detail/:id', getDetailProduct)
router.post('/add_details/:id', createDetailP)
router.delete('/details/:id', deleteDetailProduct)

export default router;