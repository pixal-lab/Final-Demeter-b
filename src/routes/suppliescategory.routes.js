import { Router } from 'express'
import { getCategory_supplies, getOneCategory_supplies, checkForDuplicates, createCategory_supplies, disableCategory_supplies, updateCategory_supplies, deleteCategory_supplies,  } from '../controllers/suppliescategory.controller.js'

const router = Router();

router.get('/suppliescategory', getCategory_supplies);
router.post('/suppliescategory', checkForDuplicates, createCategory_supplies);
router.put('/suppliescategory/disable/:id', disableCategory_supplies);
router.put('/suppliescategory/update/:id', updateCategory_supplies);
router.delete('/suppliescategory/:id', deleteCategory_supplies);
router.get('/suppliescategory/:id', getOneCategory_supplies);

export default router;