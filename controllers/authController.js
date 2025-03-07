const User = require("../models/User");
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs'); // ใช้เข้ารหัส password

exports.register = async (req, res) => {
  try {
    const { username, firstName, lastName, password, phone, role } = req.body;
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      password,
      phone,
      role: role || "user",
    });

    return res
      .status(201)
      .json({ message: "สมัครสมาชิกสำเร็จ", user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received login request:", { username, password });

    const user = await User.findOne({ where: { username, deleted_at: null } });
    console.log("User found:", user);

    if (!user || user.role !== "admin") {
      console.log("User not found");
      return res
        .status(400)
        .json({ message: "ไม่มีสิทธิ์เข้า" });
    }

    if (user.password !== password || user.role !== "admin") {
      console.log("Password mismatch");
      return res
        .status(400)
        .json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }

    console.log("Login successful");
    res.status(200).json({
      message: "เข้าสู่ระบบสำเร็จ",
      //role: user.role
      user: { id: user.id, username: user.username, role: user.role ,deleted_at: user.deleted_at},
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" });
  }
};
