import { supplies } from "../models/supplies.model.js";
import { Op } from 'sequelize';

export const getSuppliessByCategory = async (req, res) => {
    const { id } = req.params

    try {
        const suppliess = await supplies.findAll({ where: { SuppliesCategory_ID: id } })
        res.json(suppliess);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getSupplies = async (req, res) => {
    try {
        const ArraySupplies = await supplies.findAll();
        res.json(ArraySupplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getSupplie = async (req, res) => {
    const { id } = req.params;
    try {
        const oneSupplie = await supplies.findOne({
            where: {
                ID_Supplies: id
            }
        });
        res.json(oneSupplie);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Name_Supplies } = req.body;

        const existing = await supplies.findOne({
            where: {
                [Op.or]: [{ Name_Supplies }],
            },
        });

        if (existing) {
            return res.status(400).json({
                error: 'Ya existe un insumo con el mismo nombre.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createSupplies = async (req, res) => {
    try {
        const { Name_Supplies, Unit, Measure, Stock } = req.body;

        const createSupplies = await supplies.create({
            Name_Supplies,
            Unit,
            Measure,
            Stock,
            State: true
        });

        res.json(createSupplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const disableSupplies = async (req, res) => {
    try {
        const { id } = req.params;

        const supply = await supplies.findOne({
            where: {
                ID_Supplies: id
            }
        });

        if (!supply) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }

        const updatedSupply = await supply.update({ State: !supply.State });

        res.json(updatedSupply);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUnitSupplieById = async (id, quantity) => {
    let hasError = false
    let message = ""
    let data = null

    try {

        const supply = await supplies.findOne({
            where: {
                ID_Supplies: id
            }
        });

        if (!supply) {
            hasError = true
            message = 'Insumo no encontrado'
        }

        data = await supplies.update({ Unit: supply?.Unit + quantity }, {
            where: {
                ID_Supplies: id
            }
        })

    } catch (error) {
        hasError = true
        message = error.message
    }

    return {
        data,
        hasError,
        message
    }
};

export const updateUnitSupplieByIdAndSend = async (req, res) => {
    try {
        const { id, quantity } = req.params
        const { data, hasError, message } = await updateUnitSupplieById(id, quantity)

        if (hasError) {
            return res.status(500).json({ message });
        }
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateSupplies = async (req, res) => {
    const { id } = req.params;
    try {
        const updateSupplies = await supplies.findOne({
            where: {
                ID_Supplies: id
            }
        });

        updateSupplies.set(req.body);
        await updateSupplies.save();
        return res.json(updateSupplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteSupplies = async (req, res) => {

    try {
        const { id } = req.params;

        await supplies.destroy({
            where: {
                ID_Supplies: id
            }
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};