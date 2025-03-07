require("dotenv").config();
const express = require('express');
const sequelize = require('./config/db');
const equipmentRoutes = require('./routes/equipmentRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth')
const issueRoute = require('./routes/issueRoute')

const app = express();
app.use(express.json());

app.use('/equipment', equipmentRoutes)
app.use('/users', userRoutes)
app.use('/auth',authRoutes)
app.use('/issue',issueRoute)

sequelize.sync()
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });