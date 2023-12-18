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

router.get('/waiter', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.WAITER
), getWaiters);
router.get('/waiter_status', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.WAITER
), getWaiterBySale);
router.post('/add_waiter', authRequired, duplicateWaiter, moduleValidation.hasPermissions(
    moduleValidation.MODULES.WAITER
), createWaiter);
router.put('/waiter/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.WAITER
), updateWaiter);

export default router;