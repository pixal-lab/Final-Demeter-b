import { Router } from 'express';
import {getSupplier, getSupplie, createSupplier, disableSupplier, updateSupplier, deleteSupplier} from '../controllers/supplier.controller.js';

const router = Router();

router.get("/supplier", getSupplier);
router.get("/supplier/:id", getSupplie);
router.post("/supplier", createSupplier);
router.put("/supplier/disable/:id", disableSupplier);
router.put("/supplier/update/:id", updateSupplier);
router.delete("/supplier/:id", deleteSupplier);   

export default router;