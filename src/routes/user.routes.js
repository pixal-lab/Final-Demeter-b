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

// router.get('/user', moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), getUsers);
// router.get('/user/:id', moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), getUser);
// router.post('/add_user', moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), checkForDuplicates, createUser);
// router.put('/user/:id', moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), updateUser);
// router.put("/user/toggle/:id", moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), toggleUserStatus);
// router.delete('/user/:id', moduleValidation.hasPermissions(
//     moduleValidation.MODULES.USER
// ), deleteUser);
router.get('/existUserByEmailOrId/:email/:document/:userType(supplier|user)', existUserByEmailOrId);
router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/add_user', createUser);
router.put('/user/:id', updateUser);
router.put("/user/toggle/:id", toggleUserStatus);
router.delete('/user/:id', deleteUser);

export default router;
