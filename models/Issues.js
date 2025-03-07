const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Equipment = require('./Equipment');

const Issues = sequelize.define('issues', {
    id: { // ✅ เปลี่ยนจาก issue_id เป็น id เพื่อให้ Sequelize ใช้ได้สะดวก
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Equipment,
            key: 'id' // ✅ ใช้ id ที่เป็น primary key ของ Equipment
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('in_progress','complete'),
        allowNull: false,
        defaultValue: 'in_progress'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'issues',
    timestamps: false
});

// ✅ กำหนดความสัมพันธ์ระหว่าง Issues กับ User และ Equipment
Issues.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'Equipment' });
Issues.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

module.exports = Issues;
