import { sequelize } from '../db/dataBase.js';
import { Op } from 'sequelize';
import { sale } from '../models/sale.model.js';
import { saleDetail } from '../models/saledetail.model.js';
import { product } from '../models/product.model.js';
import { shopping } from '../models/shopping.model.js';
import { shoppingDetail } from '../models/shoppingdetail.model.js';
import { supplies } from '../models/supplies.model.js';


export const mostPurchasedSupplies = async (req, res) => {
    try {
        const mostPurchased = await supplies.findAll({
            include: [
                {
                    model: shoppingDetail,
                    attributes: ['Supplies_ID', [sequelize.fn('sum', sequelize.col('Lot')), 'totalLot']],
                    group: ['Supplies_ID'],
                    order: [[sequelize.literal('totalLot'), 'DESC']],
                    limit: 5, // Obtener los 5 más comprados
                },
            ],
        });

        res.json(mostPurchased);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const mostSoldProducts = async (req, res) => {
    try {
        const mostSold = await product.findAll({
            include: [
                {
                    model: saleDetail,
                    attributes: ['Product_ID', [sequelize.fn('sum', sequelize.col('Lot')), 'totalLot']],
                    group: ['Product_ID'],
                    order: [[sequelize.literal('totalLot'), 'DESC']],
                    limit: 5, // Obtener los 5 más vendidos
                },
            ],
        });

        res.json(mostSold);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const totalProfitAndExpenses = async (req, res) => {
    try {
        const totalProfit = await sale.sum('Total', {
            where: { StatePay: true },
        });

        const totalExpenses = await shopping.sum('Total', {
            where: { State: true },
        });

        res.json({ totalProfit, totalExpenses });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const organizeByDay = async (req, res) => {
    try {
        const salesByDay = await sale.findAll({
            attributes: [
                [
                    sequelize.fn(
                        'date_trunc',
                        'day',
                        sequelize.fn('now') // Utiliza la fecha y hora actual
                    ),
                    'day',
                ],
                [sequelize.fn('sum', sequelize.col('Total')), 'totalSales'],
            ],
            where: {
                Datetime: {
                    [Op.gte]: sequelize.fn('date_trunc', 'day', sequelize.fn('now')),
                },
            },
        });

        const expensesByDay = await shopping.findAll({
            attributes: [
                [
                    sequelize.fn(
                        'date_trunc',
                        'day',
                        sequelize.fn('now') // Utiliza la fecha y hora actual
                    ),
                    'day',
                ],
                [sequelize.fn('sum', sequelize.col('Total')), 'totalExpenses'],
            ],
            where: {
                Datetime: {
                    [Op.gte]: sequelize.fn('date_trunc', 'day', sequelize.fn('now')),
                },
            },
        });

        res.json({ salesByDay, expensesByDay });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const organizeByWeek = async (req, res) => {
    try {
        const salesByWeek = await sale.findAll({
            attributes: [
                [
                    sequelize.fn(
                        'date_trunc',
                        'week',
                        sequelize.fn('now') // Utiliza la fecha y hora actual
                    ),
                    'week',
                ],
                [sequelize.fn('sum', sequelize.col('Total')), 'totalSales'],
            ],
            where: {
                Datetime: {
                    [Op.gte]: sequelize.fn('date_trunc', 'week', sequelize.fn('now')),
                },
            },
        });

        const expensesByWeek = await shopping.findAll({
            attributes: [
                [
                    sequelize.fn(
                        'date_trunc',
                        'week',
                        sequelize.fn('now') // Utiliza la fecha y hora actual
                    ),
                    'week',
                ],
                [sequelize.fn('sum', sequelize.col('Total')), 'totalExpenses'],
            ],
            where: {
                Datetime: {
                    [Op.gte]: sequelize.fn('date_trunc', 'week', sequelize.fn('now')),
                },
            },
        });

        res.json({ salesByWeek, expensesByWeek });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const organizeByMonth = async (req, res) => {
    try {
        const salesByMonth = await sale.findAll({
            attributes: [
                [
                    sequelize.fn(
                        'date_trunc',
                        'month',
                        sequelize.fn('now') // Utiliza la fecha y hora actual
                    ),
                    'month',
                ],
                [sequelize.fn('sum', sequelize.col('Total')), 'totalSales'],
            ],
            where: {
                Datetime: {
                    [Op.gte]: sequelize.fn('date_trunc', 'month', sequelize.fn('now')),
                },
            },
        });

        const expensesByMonth = await shopping.findAll({
            attributes: [
                [
                    sequelize.fn(
                        'date_trunc',
                        'month',
                        sequelize.fn('now') // Utiliza la fecha y hora actual
                    ),
                    'month',
                ],
                [sequelize.fn('sum', sequelize.col('Total')), 'totalExpenses'],
            ],
            where: {
                Datetime: {
                    [Op.gte]: sequelize.fn('date_trunc', 'month', sequelize.fn('now')),
                },
            },
        });

        res.json({ salesByMonth, expensesByMonth });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const totalProfitAndExpensesByPaymentMethod = async (req, res) => {
    try {
        const paymentMethods = await sale.findAll({
            attributes: ['Payment', [sequelize.fn('count', sequelize.col('Payment')), 'usageCount']],
            group: ['Payment'],
        });

        res.json(paymentMethods);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const totalUnitsPurchasedBySupply = async (req, res) => {
    try {
        const totalUnitsPurchased = await shoppingDetail.findAll({
            attributes: [
                'Supplies_ID',
                [sequelize.fn('sum', sequelize.col('Lot')), 'totalUnitsPurchased'],
            ],
            group: ['Supplies_ID'],
        });

        res.json(totalUnitsPurchased);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const totalUnitsSoldByProduct = async (req, res) => {
    try {
        const totalUnitsSold = await saleDetail.findAll({
            attributes: [
                'Product_ID',
                [sequelize.fn('sum', sequelize.col('Lot')), 'totalUnitsSold'],
            ],
            group: ['Product_ID'],
        });

        res.json(totalUnitsSold);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const averageUnitsPerPurchase = async (req, res) => {
    try {
        const averageUnits = await shoppingDetail.findAll({
            attributes: [
                [sequelize.fn('avg', sequelize.col('Lot')), 'averageUnitsPerPurchase'],
            ],
        });

        res.json(averageUnits);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const averageUnitsPerSale = async (req, res) => {
    try {
        const averageUnits = await saleDetail.findAll({
            attributes: [
                [sequelize.fn('avg', sequelize.col('Lot')), 'averageUnitsPerSale'],
            ],
        });

        res.json(averageUnits);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const netIncomeByProduct = async (req, res) => {
    try {
        const netIncome = await product.findAll({
            include: [
                {
                    model: saleDetail,
                    attributes: [
                        'Product_ID',
                        [sequelize.literal('(SUM(Lot) * Product.Price) - SUM(Lot * Supplies.Price)'), 'netIncome'],
                    ],
                    group: ['Product_ID'],
                },
            ],
        });

        res.json(netIncome);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const netIncomeBySupply = async (req, res) => {
    try {
        const netIncome = await supplies.findAll({
            include: [
                {
                    model: shoppingDetail,
                    attributes: [
                        'Supplies_ID',
                        [sequelize.literal('SUM(Lot * Supplies.Price)'), 'netIncome'],
                    ],
                    group: ['Supplies_ID'],
                },
            ],
        });

        res.json(netIncome);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};