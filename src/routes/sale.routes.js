import { Router } from "express";
import { getSale, createSale, updateSale, pay, getOneSale, deleteSale} from "../controllers/sale.controller.js";

const router = Router();

router.get('/sale', getSale);
router.get('/getSale/:ID_Sale', getOneSale);
router.post('/Csale', createSale);
router.put('/UpdateSale', updateSale);
router.put('/paySale', pay);
router.delete('/deleteSale', deleteSale);


export default router;