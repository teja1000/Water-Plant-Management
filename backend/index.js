

const express = require('express');
const connectDB = require('./db');
const customerRoutes = require('./Routes/CustomerRoute');
const orderRoutes = require('./Routes/OrderRoute');
const transactionRoutes=require('./Routes/Troute');
const accountRoutes = require('./Routes/Aroute');

const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/transactions', transactionRoutes);
app.use('/accounts', accountRoutes);


const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

