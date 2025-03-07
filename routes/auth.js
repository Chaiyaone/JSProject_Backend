const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 📌 สร้างเส้นทาง API Register

router.post('/login', authController.login)
module.exports = router;
