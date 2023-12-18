import { Op } from 'sequelize';
import { sale } from '../models/sale.model.js';
import { saleDetail } from '../models/saledetail.model.js';
import { product } from '../models/product.model.js';
import { shopping } from '../models/shopping.model.js';
import { shoppingDetail } from '../models/shoppingdetail.model.js';
import { supplies } from '../models/supplies.model.js';
import { sequelize } from '../db/dataBase.js';

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

export const getShoppingByDate = async (req, res) => {
    try {
        const shoppingByDate = await shopping.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('Datetime')), 'shoppingDate'],
                [sequelize.fn('COUNT', sequelize.col('*')), 'totalShopping'],
                [sequelize.fn('SUM', sequelize.col('Total')), 'totalAmount'],
            ],
            group: [sequelize.fn('DATE', sequelize.col('Datetime'))],
            raw: true,
        });

        res.json(shoppingByDate);
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

export const countAllDetailsByProduct = async (req, res) => {
    try {
        const mostSoldProduct = await saleDetail.findAll({
            attributes: [
                [sequelize.literal('product.Name_Products'), 'ProductName'],
                [sequelize.fn('COUNT', sequelize.col('Product_ID')), 'detailCount'],
            ],
            include: [
                {
                    model: product,
                    attributes: [],
                },
            ],
            group: ['Product_ID'],
            order: [[sequelize.literal('detailCount'), 'DESC']],
            limit: 1,
            raw: true,
        });

        res.json(mostSoldProduct[0]); // Devuelve el primer elemento del array (el único resultado debido al límite)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMostExpensiveSupply = async (req, res) => {
    try {
        const mostExpensiveSupply = await shoppingDetail.findOne({
            attributes: [
                'Supplies_ID',
                [sequelize.fn('SUM', sequelize.literal('Price_Supplier * Lot')), 'totalSpent'],
                [sequelize.literal('Supply.Name_Supplies'), 'userName'],
            ],
            group: ['Supplies_ID'],
            order: [[sequelize.literal('totalSpent'), 'DESC']],

            include: [
                {
                    model: supplies,
                    attributes: ['Name_Supplies'], // Agrega los campos que deseas obtener del modelo de supplies
                },
            ],
            raw: true,
        });

        res.json(mostExpensiveSupply);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};