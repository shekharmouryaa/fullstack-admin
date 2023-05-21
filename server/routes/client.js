import express from 'express';
import { getProducts, getProduct,addProduct,getCustomers, getTransactions, getGeography } from '../controllers/client.js';
const router = express.Router();

router.get('/products', getProducts);
router.get('/product/:id', getProduct);
router.post('/product', addProduct);

router.get('/customers', getCustomers)

router.get('/transactions', getTransactions)

router.get('/geography',getGeography)

export default router;