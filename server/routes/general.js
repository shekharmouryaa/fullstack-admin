import express from 'express';
import {getUsers,getUser,addUser, getDashboardStats} from '../controllers/general.js';

const router = express.Router();
// USERS ROUTES
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.post('/user', addUser);

// DASHBOARD ROUTES
router.get('/dashboard', getDashboardStats);

export default router;