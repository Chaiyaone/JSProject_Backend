const User = require('../models/User');

// exports.getAllUsers = (req, res) => {
//     User.findAll().then(users => {
//         res.json(users);
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// };
exports.getAllUsers = async (req, res) => {
    let page = parseInt(req.query.page) || 1; 
    let limit = parseInt(req.query.limit) || 10; 
    let offset = (page - 1) * limit; 
  
    try {
      const { count, rows: user } = await User.findAndCountAll({
        where: { deleted_at: null }, // ใส่เงื่อนไขตรวจสอบ deleted_at
        limit: limit,
        offset: offset,
        order: [['id', 'ASC']], 
      });
  
      res.json({
        user,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

// exports.getAllUsers = async (req, res) => {
//     let page = parseInt(req.query.page) || 1; // หน้าเริ่มต้นที่ 1
//     let limit = parseInt(req.query.limit) || 10; // แสดงได้สูงสุดไม่เกิน10หน้า
//     let offset = (page - 1) * limit; // หาจุดเริ่มต้น

//     try {
//         const { count, rows: user } = await User.findAndCountAll({
//             limit: limit,
//             offset: offset,
//             order: [['id', 'ASC']], // เรียงจากน้อยไปมาก
//         });

//         res.json({
//             user,
//             currentPage: page,
//             totalPages: Math.ceil(count / limit),
//         });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

// exports.getUserById = (req, res) => {
//     User.findByPk(req.params.id).then(user => {
//         if (!user) {
//             res.status(404).send('User not found');
//         } else {
//             res.json(user);
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// };
exports.getUserById = (req, res) => {
    User.findOne({ 
      where: { 
        id: req.params.id,
        deleted_at: null // ตรวจสอบ deleted_at ด้วย
      }
    }).then(user => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.json(user);
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  };

exports.createUser = (req, res) => {
    User.create(req.body).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.updateUser = (req, res) => {
    User.findOne({
      where: { 
        id: req.params.id,
        deleted_at: null // ตรวจสอบ deleted_at ก่อนอัปเดต
      }
    }).then(user => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        user.update(req.body).then(() => {
          res.send(user);
        }).catch(err => {
          res.status(500).send(err);
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  };

// exports.updateUser = (req, res) => {
//     User.findByPk(req.params.id).then(user => {
//         if (!user) {
//             res.status(404).send('User not found');
//         } else {
//             user.update(req.body).then(() => {
//                 res.send(user);
//             }).catch(err => {
//                 res.status(500).send(err);
//             });
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// };

exports.deleteUser = (req, res) => {
    User.findByPk(req.params.id).then(user => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        // แทนที่ user.destroy() ด้วยการอัปเดต deleted_at
        user.update({ deleted_at: new Date() }).then(() => {
          res.send({ message: 'ปิดการใช้งานผู้ใช้สำเร็จ' });
        }).catch(err => {
          res.status(500).send(err);
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  };

// exports.deleteUser = (req, res) => {
//     User.findByPk(req.params.id).then(user => {
//         if (!user) {
//             res.status(404).send('User not found');
//         } else {
//             user.destroy().then(() => {
//                 res.send({});
//             }).catch(err => {
//                 res.status(500).send(err);
//             });
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// };