import express from 'express';
import {getUsers,getUser,addUser, getDashboardStats, deleteUser,updateUser} from '../controllers/general.js';
import { addEmployee, deleteEmployee, getEmployee, getEmployees, loginEmployee, updateEmployee } from '../controllers/employee.js';
const router = express.Router();
// USERS ROUTES
router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.post('/user/add', addUser);
router.delete('/user/delete/:id', deleteUser);
router.put('/user/update/:id', updateUser);

// Only for Testing
router.get('/employees', getEmployees);
router.get('/employee/:id', getEmployee);
router.post('/employee/add', addEmployee);
router.delete('/employee/delete/:id', deleteEmployee);
router.put('/employee/update/:id', updateEmployee);

//Login api
router.post('/employee/login', loginEmployee);


// DASHBOARD ROUTES
router.get('/dashboard', getDashboardStats);

export default router;