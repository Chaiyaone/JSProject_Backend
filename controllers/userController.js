const User = require('../models/User');

exports.getAllUsers = (req, res) => {
    User.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.getUserById = (req, res) => {
    User.findByPk(req.params.id).then(user => {
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
    User.findByPk(req.params.id).then(user => {
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

exports.deleteUser = (req, res) => {
    User.findByPk(req.params.id).then(user => {
        if (!user) {
            res.status(404).send('User not found');
        } else {
            user.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
};