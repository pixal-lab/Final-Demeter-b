import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"
import { role } from "../models/role.model.js"
import { module } from "../models/module.model.js"
import { request, response } from "express"
import { user } from "../models/user.model.js"
import { modulePermission } from "../models/modulePermission.model.js"

export default class {

  #errorHandler
  #res
  #req
  constructor(errorHandler = ({
    req = request,
    res = response,
    next = () => null,
    error = new Error("")
  }) => null) {

    this.MODULES = {
      DASHBOARD: "DashBoard",
      SETTINGS: "Configuracion",
      USER: "Empleados",
      CATEGORY_SUPPLIES: "Categoria_Insumos",
      SUPPLIES: "Insumos",
      SUPPLIER: "Proveedores",
      SHOPPING: "Compras",
      CATEGORY_PRODUCT: "Categoria_Productos",
      PRODUCT: "Productos",
      WAITER: "Meseros",
      SALES: "Ventas"
    }

    this.#errorHandler = errorHandler
    this.userModel = user
    this.moduleTypes = module
    this.modulePermission = modulePermission
    this.roleModel = role
  }

  getCurrentUserAndRole = async () => {

    const token = this.#req.cookies.token
    const user = jwt.decode(token, TOKEN_SECRET)

    return await this.userModel.findOne({
      where: {
        ID_User: user?.id || user?.ID_User
      },

      include: [
        {
          model: this.roleModel,
          required: true
        }
      ]
    })
  }

  hasPermissions = (...moduleView) => {

    return async (req, res, next) => {

      try {
        this.#res = res
        this.#req = req
        const moduleNames = Array.from(await this.getAssociatedModulePermissionsByRole())
        const includes = moduleView.every(m => moduleNames.some(md => md.Module.Name_Module === m))

        if (!includes) {
          this.#errorHandler({
            req,
            res,
            next,
            error: new Error("No tienes permisos")
          })
          return
        }

        next()
      }
      catch (error) {
        this.#errorHandler({
          error,
          next,
          req,
          res
        })
      }
    }
  }

  getAssociatedModulePermissionsByRole = async () => {

    const user = await this.getCurrentUserAndRole()

    if (!user) throw new Error("El usuario no existe")
    const permissions = await this.modulePermission.findAll({
      where: {
        Role_ID: user.Role_ID
      },
      include: [{
        model: this.moduleTypes,
        required: true
      }]
    })
    return permissions
  }
}

/*

INSERT INTO modules(Name_module)
VALUES
("DashBoard"),
("Configuracion"),
("Empleados"),
("Categoria_Insumos"),
("Insumos"),
("Proveedores"),
("Compras"),
("Categoria_Productos"),
("Productos"),
("Meseros"),
("Ventas");

INSERT INTO `roles` (`ID_Role`, `Name_Role`, `State`) VALUES (NULL, 'Administrador', '1');

INSERT INTO `modulepermissions` (`Role_ID`, `Module_ID`) VALUES (1, '1'), (1, '2'), (1, '3'), (1, '4'), (1, '5'), (1, '6'), (1, '7'), (1, '8'), (1, '9'), (1, '10'), (1, '11')
*/