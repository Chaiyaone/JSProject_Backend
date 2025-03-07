// controllers/issueController.js
const Issues = require('../models/Issues');
const Equipment = require('../models/Equipment');
const User = require('../models/User');

exports.getAllIssues = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5; // รับค่า limit จาก Frontend
    let offset = (page - 1) * limit;
  
    try {
      const { count, rows: issues } = await Issues.findAndCountAll({
        include: [
          { 
            model: Equipment,
            as: 'Equipment',
            attributes: ["equipment_name"],
          },
          { 
            model: User,
            as: 'User',
            attributes: ["username"],
            
          }
        ],
        limit: limit, // ใช้ limit ที่ได้รับจาก Frontend
        offset: offset,
        order: [['id', 'ASC']]
      });
  
      const formattedIssues = issues.map(issue => ({
        id: issue.id,
        equipment_name: issue.Equipment?.equipment_name || "Guest",
        username: issue.User?.username || "Guest",
        description: issue.description,
        created_at: issue.created_at,
        status: issue.status
      }));
      res.json({
        issues: formattedIssues,
        currentPage: page,
        totalPages: Math.ceil(count / limit) // คำนวณ totalPages ตาม limit
      });
    } catch (err) {
      console.error("Error fetching issues:", err);
      res.status(500).json({ message: "Error fetching issues" });
    }
  };




exports.createIssue = async (req, res) => {
    try {
        const { user_id, equipment_id, description } = req.body;
        console.log(req.body)

        if (!user_id || !equipment_id || !description) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
        }

   
        const newIssue = await Issues.create({
            user_id,
            equipment_id,
            description
        });

    
        const equipment = await Equipment.findByPk(equipment_id);

        if (!equipment) {
            return res.status(404).json({ message: 'ไม่พบอุปกรณ์' });
        }

        equipment.repair_count += 1;

      
        await equipment.save();

      
        res.status(201).json(newIssue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

