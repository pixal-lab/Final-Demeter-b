import { Router } from 'express'
import { getCategoriesProducts, getCategory_products, getOneCategory_products, checkForDuplicates, createCategory_products, disableCategory_products, updateCategory_products, deleteCategory_products } from '../controllers/productcategory.controller.js'

const router = Router();

router.get('/productcategory', getCategory_products);
router.get('/productCategories', getCategoriesProducts);
router.post('/productcategory', checkForDuplicates, createCategory_products);
router.put('/productcategory/disable/:id', disableCategory_products);
router.put('/productcategory/update/:id', updateCategory_products);
router.delete('/productcategory/:id', deleteCategory_products);
router.get('/productcategory/:id', getOneCategory_products);

export default router;