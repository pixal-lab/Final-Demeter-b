import { Router } from "express";
import { getUsers, getUser, checkForDuplicates, createUser, updateUser, toggleUserStatus, deleteUser, existUserByEmailOrId } from '../controllers/user.controller.js'; // Empleados

import { authRequired } from '../middlewares/validateToken.js'
import ModuleValidationMiddleware from '../middlewares/ModuleValidation.middleware.js'

const router = Router();

// const moduleValidation = new ModuleValidationMiddleware(
//     ({
//         res,
//         error
//     }) => {
//         res.json({
//             message: error.message
//         })
//     }
// )

// router.get('/user', authRequired, moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), getUsers);
// router.get('/user/:id', authRequired, moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), getUser);
// router.post('/add_user', authRequired, moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), checkForDuplicates, createUser);
// router.put('/user/:id', authRequired, moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), updateUser);
// router.put("/user/toggle/:id", authRequired, moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), toggleUserStatus);
// router.delete('/user/:id', authRequired, moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), deleteUser);
router.get('/existUserByEmailOrId/:email/:document/:userType(supplier|user)', existUserByEmailOrId);

router.get('/user', authRequired, getUsers);
router.get('/user/:id', authRequired, getUser);
router.post('/add_user', checkForDuplicates, createUser);
router.put('/user/:id', authRequired, updateUser);
router.put("/user/toggle/:id", authRequired, toggleUserStatus);
router.delete('/user/:id', authRequired, deleteUser);

export default router;
