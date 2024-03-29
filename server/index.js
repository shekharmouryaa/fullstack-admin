import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import salesRoutes from './routes/sales.js';
import managementRoutes from './routes/management.js';

/* DATA IMPORT */
// import User from './models/User.js';
// import Employee from './models/Employees.js';
// import Product from './models/Product.js';
// import ProductStat from './models/ProductStat.js';
// import Transaction from './models/Transaction.js';
// import OverallStats from './models/OverallStats.js';
// import {dataUser,dataProduct, dataProductStat, dataTransaction, dataOverallStat, employeesData} from './data/index.js';

/* CONFIGURATION */
const app = express();
dotenv.config();
app.use(express. json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/sales', salesRoutes);
app.use('/management', managementRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
        /* Only to insert data run once */
        
        // User.insertMany(dataUser)

        // Product.insertMany(dataProduct)
        
        // ProductStat.insertMany(dataProductStat)
        
        //  Transaction.insertMany(dataTransaction)

        // OverallStats.insertMany(dataOverallStat)

        // Employee.insertMany(employeesData)
    });
}).catch(err => console.log(err));