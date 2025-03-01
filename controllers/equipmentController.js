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