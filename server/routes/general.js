import express from 'express';
import {getUsers,getUser,addUser, getDashboardStats, deleteUser,updateUser} from '../controllers/general.js';

const router = express.Router();
// USERS ROUTES
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.post('/user/add', addUser);
router.delete('/user/delete/:id', deleteUser);
router.put('/user/update/:id', updateUser);

// DASHBOARD ROUTES
router.get('/dashboard', getDashboardStats);

export default router;