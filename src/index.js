import app from './app.js'
import { sequelize } from './db/dataBase.js'

import './models/permission.model.js'
import './models/module.model.js'
import './models/permissionModule.model.js'
import './models/sale.model.js'
import './models/saledetail.model.js'
import './models/losses.model.js'

async function main() {
    try{
        await sequelize.sync({force: false})
        app.listen(4080);
        console.log('Server on port ', 4080);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();