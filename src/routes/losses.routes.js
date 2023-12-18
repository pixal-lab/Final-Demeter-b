import { Router } from 'express';

import { getLosses, getLoss, createLoss } from '../controllers/losses.controller.js';

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

router.get("/losses", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIES
), getLosses);
router.get("/losses/:id", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIES
), getLoss);
router.post("/losses", authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SUPPLIES
), createLoss);

export default router;
