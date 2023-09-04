import express from 'express';
import {getUsers,getUser,addUser, getDashboardStats, deleteUser} from '../controllers/general.js';

const router = express.Router();
// USERS ROUTES
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.post('/user', addUser);
router.delete('/user/:id', deleteUser);

// DASHBOARD ROUTES
router.get('/dashboard', getDashboardStats);

export default router;