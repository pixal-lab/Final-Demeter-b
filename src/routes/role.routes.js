import { Router } from "express";

import { getRoles, checkForDuplicates, datosType, createRoles, updateRole, toggleRoleStatus, addModuleToRole, addMultipleModuleAndRole, addMultipleModuleAndRoleAndDeleteIfExists, } from '../controllers/role.controller.js';

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

router.get('/role', getRoles);
router.post('/role/addModuleToRole/:roleId/:moduleId', addModuleToRole);
router.post('/role/addMultipleModuleAndRole/:roleId', addMultipleModuleAndRole);
router.post('/role/addMultipleModuleAndRoleAndDeleteIfExists/:roleId', addMultipleModuleAndRoleAndDeleteIfExists);
router.post('/add_role', createRoles);
router.put('/role/:id', updateRole);
router.put('/role/toggle/:id', toggleRoleStatus);

router.post('/type', datosType);

export default router;