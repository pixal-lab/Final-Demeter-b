import { Router } from "express";
import { getSale, createSale, updateSale, pay, getOneSale, deleteSale, getSaleUp, getSaleDown, getSalesByTimeRange, getSalesByDate, getSalesByUser} from "../controllers/sale.controller.js";

const router = Router();

router.get('/sale', getSale);
router.get('/saleUP', getSaleUp);
router.get('/saleDOWN', getSaleDown);
router.get('/getSale/:ID_Sale', getOneSale);
router.get('/getSaleByTime', getSalesByTimeRange);
router.get('/getSaleByTimepc', getSalesByDate);
router.get('/getSaleByuserpc', getSalesByUser);
router.post('/Csale', createSale);
router.put('/UpdateSale', updateSale);
router.put('/paySale', pay);
router.delete('/deleteSale', deleteSale);


export default router;