const Equipment = require('../models/Equipment');

exports.getAllEquipment = (req, res) => {
    Equipment.findAll().then(equipment => {
        res.json(equipment);
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.getEquipmentById = (req, res) => {
    Equipment.findByPk(req.params.id).then(equipment => {
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
        if (!equipment) { // ตรวจสอบว่า equipment มีอยู่หรือไม่
            res.status(404).send('Equipment not found');
        } else {
            equipment.destroy().then(() => {
                res.send({ message: 'Equipment deleted successfully' }); // ส่งข้อความยืนยันการลบ
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.updateEquipment = (req,res) => {
    Equipment.findByPk(req.params.id).then(equipment => {
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