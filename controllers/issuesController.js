const Issues = require('../models/issues');
const Equipment = require('../models/Equipment'); // นำเข้าโมเดล Equipment

exports.createIssue = async (req, res) => {
    try {
        const { user_id, equipment_id, description } = req.body;

        // ตรวจสอบข้อมูล
        if (!user_id || !equipment_id || !description) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
        }

        // สร้าง Issue ใหม่
        const newIssue = await Issues.create({
            user_id,
            equipment_id,
            description
        });

        // ค้นหา Equipment ที่เกี่ยวข้อง
        const equipment = await Equipment.findByPk(equipment_id);

        if (!equipment) {
            return res.status(404).json({ message: 'ไม่พบอุปกรณ์' });
        }

        // เพิ่ม repair_count ขึ้น 1
        equipment.repair_count += 1;

        // บันทึกการเปลี่ยนแปลง
        await equipment.save();

        // ส่งผลลัพธ์กลับ
        res.status(201).json(newIssue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};