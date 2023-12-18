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
