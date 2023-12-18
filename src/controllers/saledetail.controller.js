import { saleDetail } from '../models/saledetail.model.js';

export const createSaleDetail = async (req, res) => {
    const {Sale_ID, Product_ID} = req.body

    try {
        const newSaleDetail = await saleDetail.create({
            Sale_ID : Sale_ID,
            Product_ID : Product_ID
        })
        res.json(newSaleDetail);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getDetails = async (req, res) => {
    try {
        const {id} = req.params
        const details = await saleDetail.findAll({where: {Sale_ID : id}})
        res.json(details);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createManyDetails = async (req, res) => {

    const newdetails = req.body

    try {
        const details = await saleDetail.bulkCreate(newdetails)
        res.json(details);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const lotUpd = async (req, res) => {
    try {
        const {ID_SaleDetail, math} = req.body
        
        const existingSale = await saleDetail.findByPk(ID_SaleDetail);

        if (!existingSale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        existingSale.lot + math
       
        await existingSale.save();

        res.json(existingSale);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteSaleDetail = async (req, res) => {
    try {
        const {ID_SaleDetail}  = req.params;

        const existingSale = await saleDetail.findByPk(ID_SaleDetail);

        if (!existingSale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        await existingSale.destroy();

        res.json({ message: 'detalle eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};