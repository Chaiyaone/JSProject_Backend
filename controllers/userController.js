const User = require('../models/User');


exports.getAllUsers = async (req, res) => {
    let page = parseInt(req.query.page) || 1; 
    let limit = parseInt(req.query.limit) || 10; 
    let offset = (page - 1) * limit; 
  
    try {
      const { count, rows: user } = await User.findAndCountAll({
        where: { deleted_at: null }, 
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


exports.getUserById = (req, res) => {
    User.findOne({ 
      where: { 
        id: req.params.id,
        deleted_at: null 
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
        deleted_at: null 
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


exports.deleteUser = (req, res) => {
    User.findByPk(req.params.id).then(user => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
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
