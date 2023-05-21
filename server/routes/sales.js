import express from 'express';
import {getOverallStats} from '../controllers/sales.js';

const router = express.Router();

router.get('/statics', getOverallStats);

export default router;