const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Issues = require('./Issues');
const User = require('./User');

const CompletedTasks = sequelize.define('completed_tasks', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    issue_id: {
        type: DataTypes.INTEGER, // เปลี่ยนเป็น INTEGER เพื่อให้ตรงกับ PK ของ Issues
        allowNull: false,
        references: {
            model: Issues,
            key: 'id' 
        }
    },
    user_id: {
        type: DataTypes.INTEGER, // เปลี่ยนเป็น INTEGER เพื่อให้ตรงกับ PK ของ User
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    completed_at: { // เปลี่ยนจาก created_at เป็น completed_at
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'completed_tasks', // เปลี่ยนชื่อตารางให้สื่อความหมาย
    timestamps: false
});

// กำหนดความสัมพันธ์ให้ถูกต้อง
CompletedTasks.belongsTo(Issues, { foreignKey: 'issue_id', as: 'issue' });
CompletedTasks.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = CompletedTasks;