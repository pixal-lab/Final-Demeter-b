import { sale } from '../models/sale.model.js';
import { Op } from 'sequelize';
import { user } from '../models/user.model.js';
import { sequelize } from '../db/dataBase.js';

export const getSale = async (req, res) => {
    try {
        const Sales = await sale.findAll()
        res.json(Sales);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getOneSale = async (req, res) => {
    const {ID_Sale} = req.params
    try {
        const Sale = await sale.findOne({where: {ID_Sale : ID_Sale}})
        res.json(Sale);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const createSale = async(req, res) => {
    
    const{Total, SubTotal, User_ID} = req.body
    
    try {
    const newSale = await sale.create({ 
        
        Total: Total,
        SubTotal : SubTotal,
        User_ID : User_ID,
        Payment : "Vacio"
       
    })

    res.json(newSale)
} catch (error) {
    return res.status(500).json({ message: error.message });
}
}

export const updateSale = async (req, res) => {
    try {
        const {ID_Sale, SubTotal, Total} = req.body
        
        const existingSale = await sale.findByPk(ID_Sale);

        if (!existingSale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        existingSale.SubTotal = SubTotal;
        existingSale.Total = Total;

       
        await existingSale.save();

        res.json(existingSale);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    
}
export const pay = async (req, res) => {
    try {
        const {ID_Sale, Payment} = req.body
        
        const existingSale = await sale.findByPk(ID_Sale);

        if (!existingSale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        existingSale.StatePay = false;
        existingSale.Payment = Payment;
        
        await existingSale.save();

        res.json(existingSale);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const deleteSale = async (req, res) => {
    try {
        const { ID_Sale } = req.params;

        const existingSale = await sale.findByPk(ID_Sale);

        if (!existingSale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        // Elimina la venta de la base de datos
        await existingSale.destroy();

        res.json({ message: 'Venta eliminada correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSaleUp = async (req, res) => {
    try {
        const Sales = await sale.findAll({
            where: {
                StatePay: true
            }
        });

        res.json(Sales);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getSaleDown = async (req, res) => {

    try {
        const Sales = await sale.findAll({
            where: {
                StatePay: false
            }
        });

        res.json(Sales);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getSalesByTimeRange = async (req, res) => {
    try {
        const { startTime, endTime } = req.query; 

        const sales = await sale.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startTime, endTime],
                },
                StatePay: 0,
            },
        });

        res.json(sales);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getSalesByDate = async (req, res) => {
    try {
        const salesByDate = await sale.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('createdAt')), 'saleDate'], // Extraer solo la parte de la fecha
                [sequelize.fn('COUNT', sequelize.col('*')), 'totalSales'], // Contar el número de ventas
                [sequelize.fn('SUM', sequelize.col('Total')), 'totalAmount'], // Sumar el monto total de ventas
            ],
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // Filtrar ventas de los últimos 30 días
                },
                Payment: {
                    [Op.ne]: 'Vacio', // Excluir ventas con Payment igual a 'Vacio'
                },
            },
            group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
            raw: true, // Obtener resultados sin formato de modelo Sequelize
        });

        res.json(salesByDate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getSalesByUser = async (req, res) => {
    try {
        const salesByUser = await sale.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('Total')), 'totalAmount'], // Sumar el monto total de ventas
                [sequelize.literal('User.Name_User'), 'userName'], // Alias para el atributo 'Name_User'
            ],
            include: [
                {
                    model: user,
                    attributes: [], // No seleccionamos el 'Name_User' aquí ya que lo estamos obteniendo con un alias
                },
            ],
            where: {
                Payment: {
                    [Op.ne]: 'Vacio', // Excluir ventas con Payment igual a 'Vacio'
                },
            },
            group: ['User_ID'], // Agrupar por User_ID
            raw: true, // Obtener resultados sin formato de modelo Sequelize
        });

        res.json(salesByUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
