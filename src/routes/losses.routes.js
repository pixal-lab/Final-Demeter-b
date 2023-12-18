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

router.get("/losses", getLosses);
router.get("/losses/:id", getLoss);
router.post("/losses", createLoss);

export default router;
