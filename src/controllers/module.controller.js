import { module } from "../models/module.model.js";
import { modulePermission } from "../models/modulePermission.model.js";

export const getModuleNames = async (req, res) => {
  try {
    const modules = await module.findAll()
    res.json(modules);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getModuleNamesAndRoleState = async (req, res) => {
  try {
    const { id } = req.params

    const [modulesPermission, modules] = await Promise.all([
      modulePermission.findAll(),
      module.findAll(),
    ])

    const data = modules.map(m => ({
      ...m.dataValues,
      roleState: modulesPermission.some(mp => +mp.Role_ID === +id && +mp.Module_ID === +m.ID_Module)
    }))

    console.log("data", data)

    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeMultipleModulePermissions = async (req, res) => {
  try {
    const { roleId } = req.params
    const modules = req.body
    const data = []

    for await (const moduleId of modules) {
      const isDeleted = await modulePermission.destroy({
        where: {
          Role_ID: roleId,
          Module_ID: moduleId
        }
      })

      data.push(isDeleted)
    }

    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
