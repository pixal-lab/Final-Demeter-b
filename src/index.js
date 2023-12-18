import app from './app.js'
import { sequelize } from './db/dataBase.js'

async function main() {
    try{
        await sequelize.sync({force: false})
        app.listen(5080);
        console.log('Server on port ', 5080);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();