const User = require('../models/User');
const bcrypt = require('bcryptjs'); // ใช้เข้ารหัส password

exports.register = async (req, res) => {
    try {
        const { username, email, password, phone, role } = req.body;

        // 🟢 1. ตรวจสอบว่า `email` มีอยู่ในระบบหรือไม่
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email นี้ถูกใช้ไปแล้ว' });
        }

        // 🟢 2. เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🟢 3. สร้าง User ใหม่
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            phone,
            role: role || 'user', // ค่า default เป็น 'user'
        });

        return res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ', user: newUser });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};
