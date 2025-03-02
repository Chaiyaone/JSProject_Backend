require("dotenv").config();
const express = require('express');
const sequelize = require('./config/db');
const equipmentRoutes = require('./routes/equipmentRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth')

const app = express();
app.use(express.json());

// ใช้ routes
app.use('/equipment', equipmentRoutes)
app.use('/users', userRoutes)
app.use('/auth',authRoutes)

// Sync ฐานข้อมูลและเริ่มต้นเซิร์ฟเวอร์
sequelize.sync()
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });