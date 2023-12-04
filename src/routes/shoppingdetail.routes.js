import { Router } from 'express';
import {getshoppingDetail, getShopDetail, createShopping } from '../controllers/shoppingdetail.controller.js'

const router = Router();

router.get('/shoppingdetail', getshoppingDetail);
router.get('/shoppingdetail/:id', getShopDetail);
router.post('/shoppingdetail', createShopping);

