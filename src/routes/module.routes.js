import { Router } from "express"

import { getModuleNames, getModuleNamesAndRoleState, removeMultipleModulePermissions } from "../controllers/module.controller.js"

const router = Router()

router.get("/getModuleNames", getModuleNames)
router.get("/getModuleNamesAndRoleState/:id", getModuleNamesAndRoleState)
router.post("/removeMultipleModulePermissions/:roleId", removeMultipleModulePermissions)

export default router
