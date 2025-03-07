const Equipment = require('../models/Equipment');

// exports.getAllEquipment = (req, res) => {  //codeเก่าก่อนเพิ่มเงื่อนไขแสดงไม่เกิน 10 หน้า
//     Equipment.findAll().then(equipment => {
//         res.json(equipment);
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// };

exports.getAllEquipment = async (req, res) => {
    let page = parseInt(req.query.page) || 1; // หน้าเริ่มต้นที่ 1
    let limit = parseInt(req.query.limit) || 10; // แสดงได้สูงสุดไม่เกิน10หน้า
    let offset = (page - 1) * limit; // หาจุดเริ่มต้น

    try {
        const { count, rows: equipment } = await Equipment.findAndCountAll({
            where: { deleted_at: null },
            limit: limit,
            offset: offset,
            order: [['id', 'ASC']], // เรียงจากน้อยไปมาก
        });

        res.json({
            equipment,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
        });
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.getEquipmentById = (req, res) => {
    Equipment.findOne({
        where: {
            id: req.params.id,
            deleted_at: null
        }
    }).then(equipment => {
        if (!equipment) {
            res.status(404).send('Equipment not found');
        } else {
            res.json(equipment);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.createEquipment = (req, res) => {
    Equipment.create(req.body).then(equipment => {
        res.send(equipment);
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.deleteEquipment = (req, res) => {
    Equipment.findByPk(req.params.id).then(equipment => {
        if (!equipment) { 
            res.status(404).send('Equipment not found');
        } else {
            equipment.update({ deleted_at: new Date() }).then(() => {
                res.send({ message: 'ลบอุปกรณ์ออกเรียบร้อย' });
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.updateEquipment = (req,res) => {
    Equipment.findOne({
        id: req.params.id,
        deleted_at: null
    }).then(equipment => {
        if(!equipment){
            res.status(404).send('Equipment not found')
        } else{
            equipment.update(req.body).then(() => {
                res.send({message : 'Equipment Update successfully'})
            }).catch(err => {
                res.status(500).send(err);
            })
        }
    }).catch(err => {
        res.status(500).send(err);
    })
}