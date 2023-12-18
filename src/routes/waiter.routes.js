import { Router } from "express";

import { getWaiters, getWaiterBySale, createWaiter, duplicateWaiter, updateWaiter } from '../controllers/waiter.controller.js'; // Meseros

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

router.get('/waiter', getWaiters);
router.get('/waiter_status', getWaiterBySale);
router.post('/add_waiter', createWaiter);
router.put('/waiter/:id', updateWaiter);

export default router;