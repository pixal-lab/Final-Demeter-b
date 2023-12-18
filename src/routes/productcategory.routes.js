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

router.get('/productcategory', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.CATEGORY_PRODUCT
), getCategory_products);
router.get('/productCategories', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.CATEGORY_PRODUCT
), getCategoriesProducts);
router.post('/productcategory', authRequired, checkForDuplicates, moduleValidation.hasPermissions(
    moduleValidation.MODULES.CATEGORY_PRODUCT
), createCategory_products);
router.put('/productcategory/disable/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.CATEGORY_PRODUCT
), disableCategory_products);
router.put('/productcategory/update/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.CATEGORY_PRODUCT
), updateCategory_products);
router.delete('/productcategory/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.CATEGORY_PRODUCT
), deleteCategory_products);
router.get('/productcategory/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.CATEGORY_PRODUCT
), getOneCategory_products);

export default router;