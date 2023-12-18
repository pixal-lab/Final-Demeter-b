import { losses } from "../models/losses.model.js";
import { supplies } from "../models/supplies.model.js";

export const getLosses = async (req, res) => {
  try {
    const arrayLosses = await losses.findAll();
    res.json(arrayLosses);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const getLoss = async (req, res) => {
  const { id } = req.params;
  try {
    const oneLoss = await losses.findOne({
      where: {
        ID_Losses: id
      },
    });
    if (!oneLoss) {
      return res.status(404).json({ mensaje: 'Pérdida no encontrada' });
    }
    res.json(oneLoss);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

export const createLoss = async (req, res) => {
  try {
    const { Unit, Measure, Reason, Supplies_ID } = req.body;

    const existingSupply = await supplies.findOne({
      where: {
        ID_Supplies: Supplies_ID,
      },
    });

    if (!existingSupply) {
      return res.status(404).json({
        error: 'Insumo no encontrado.',
      });
    }

    const validMeasures = ['Unidad(es)', 'Kilogramos (kg)', 'Gramos (g)', 'Litros (L)', 'Mililitros (ml)'];

    if (!validMeasures.includes(Measure)) {
      return res.status(400).json({ mensaje: 'Medida no válida.' });
    }

    const createLoss = await losses.create({
      Unit,
      Measure,
      Reason,
      Supplies_ID,
    });

    // Actualizar la cantidad de insumo
    existingSupply.Unit -= Unit;
    if (existingSupply.Unit < 0) {
      existingSupply.Unit = 0;
    }
    await existingSupply.save();

    res.json(createLoss);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};
