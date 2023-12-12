import { Router } from "express";
import { createSaleDetail, getDetails,getDetailsWithProductInfo, createManyDetails, lotUpd, deleteSaleDetail, countAllDetailsByProduct} from "../controllers/saledetail.controller.js";

const router = Router();

router.post('/Csaledetail', createSaleDetail);
router.post('/CManyDetails', createManyDetails);
router.get('/details/:id', getDetails);
router.get('/detailsBP', countAllDetailsByProduct);
router.get('/detailsWproduct/:id', getDetailsWithProductInfo);
router.put('/update',lotUpd )
router.delete('/deleteDetailS/:ID_SaleDetail',deleteSaleDetail )

export default router;