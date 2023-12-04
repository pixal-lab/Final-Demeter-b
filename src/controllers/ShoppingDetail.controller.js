import {shoppingDetail} from '../models/shoppingdetail.model.js'

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
        const { ID_ShoppingDetail, Lot, Price_Supplier, Shopping_ID, Supplies_ID } = req.body;

        const createShopping = await shopping.create({
         ID_ShoppingDetail,	
         Lot, 
         Price_Supplier,
         Shopping_ID, 
         Supplies_ID, 
        });

        res.json(createShopping);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};