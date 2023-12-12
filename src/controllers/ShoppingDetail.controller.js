import {shoppingDetail} from '../models/shoppingdetail.model.js'
import { sequelize } from '../db/dataBase.js';
import { supplies } from '../models/supplies.model.js';
export const getshoppingDetail = async (req, res) => {
    try {
        const ArrayshoppingDetail = await shoppingDetail.findAll();
        res.json(ArrayshoppingDetail);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getShopDetail = async (req, res) => {
    const { id } = req.params;
    try {                                                                                                                 
        const ShopDetail = await shoppingDetail.findOne({
            where: {
                ID_ShoppingDetail: id
            }
        });
        res.json(ShopDetail);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createShopping = async (req, res) => {
    try {
        const {  Lot, Price_Supplier } = req.body;

        const createShopping = await shopping.create({
         Lot, 
         Price_Supplier
         
        });

        res.json(createShopping);
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