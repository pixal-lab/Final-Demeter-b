import { Router } from 'express'

import { getCategory_products, getOneCategory_products, getCategoriesProducts, checkForDuplicates, createCategory_products, disableCategory_products, updateCategory_products, deleteCategory_products } from '../controllers/productcategory.controller.js'

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

router.get('/productcategory', getCategory_products);
router.get('/productCategories', getCategoriesProducts);
router.post('/productcategory', createCategory_products);
router.put('/productcategory/disable/:id', disableCategory_products);
router.put('/productcategory/update/:id', updateCategory_products);
router.delete('/productcategory/:id', deleteCategory_products);
router.get('/productcategory/:id', getOneCategory_products);

export default router;