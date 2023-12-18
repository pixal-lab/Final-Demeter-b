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

router.get('/role', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SETTINGS
), getRoles);
router.post('/role/addModuleToRole/:roleId/:moduleId', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SETTINGS
), addModuleToRole);
router.post('/role/addMultipleModuleAndRole/:roleId', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SETTINGS
), addMultipleModuleAndRole);
router.post('/role/addMultipleModuleAndRoleAndDeleteIfExists/:roleId', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SETTINGS
), addMultipleModuleAndRoleAndDeleteIfExists);
router.post('/add_role', authRequired, checkForDuplicates, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SETTINGS
), createRoles);
router.put('/role/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SETTINGS
), updateRole);
router.put('/role/toggle/:id', authRequired, moduleValidation.hasPermissions(
    moduleValidation.MODULES.SETTINGS
), toggleRoleStatus);

router.post('/type', datosType);

export default router;