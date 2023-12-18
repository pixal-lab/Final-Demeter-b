import { suppliesCategory } from "../models/suppliescategory.model.js";
import { Op } from 'sequelize';

export const getCategory_supplies = async (req, res) => {
    try {
        const arrayCategory_supplies = await suppliesCategory.findAll();
        res.json(arrayCategory_supplies);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const getOneCategory_supplies = async (req, res) => {
    try {
        const { id } = req.params;
        const oneCategory_supplies = await suppliesCategory.findOne({
            where: {
                ID_SuppliesCategory: id
            }
        });

        if (!oneCategory_supplies) return res.status(404).json({ mensaje: 'Este id no existe' });
        res.json(oneCategory_supplies);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Name_SuppliesCategory } = req.body;

        const existing = await suppliesCategory.findOne({
            where: {
                [Op.or]: [{ Name_SuppliesCategory }],
            },
        });

        if (existing) {
            return res.status(400).json({
                error: 'Ya existe una categoría con el mismo nombre.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const createCategory_supplies = async (req, res) => {
    try {
        const { Name_SuppliesCategory } = req.body;

        // Validar que el nombre de la categoría no esté vacío
        if (!Name_SuppliesCategory) {
            return res.status(400).json({ mensaje: 'El nombre de la categoría es requerido.' });
        }

        const newCategory_supplies = await suppliesCategory.create({
            Name_SuppliesCategory,
            State: true,
        });

        res.json(newCategory_supplies);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const disableCategory_supplies = async (req, res) => {
    try {
        const { id } = req.params;

        const categorySupply = await suppliesCategory.findOne({
            where: {
                ID_SuppliesCategory: id
            }
        });

        if (!categorySupply) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        const updatedCategorySupply = await categorySupply.update({ State: !categorySupply.State });

        res.json(updatedCategorySupply);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const updateCategory_supplies = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name_SuppliesCategory } = req.body;

        // Validar que el nombre de la categoría no esté vacío
        if (!Name_SuppliesCategory) {
            return res.status(400).json({ mensaje: 'El nombre de la categoría es requerido.' });
        }

        const updateCategory_supplies = await suppliesCategory.findByPk(id);

        if (!updateCategory_supplies) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        updateCategory_supplies.Name_SuppliesCategory = Name_SuppliesCategory;
        await updateCategory_supplies.save();

        res.json(updateCategory_supplies);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const deleteCategory_supplies = async (req, res) => {
    try {
        const { id } = req.params;

        await suppliesCategory.destroy({
            where: {
                ID_SuppliesCategory: id,
            },
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};