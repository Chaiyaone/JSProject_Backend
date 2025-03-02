const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Issues = require('./issues');
const User = require('./User');

const Notifications = sequelize.define('notifications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    issue_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Issues,
            key: 'id' // ✅ ใช้ id ที่เป็น primary key ของ Equipment
        }
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('READ', 'UNREAD'),
        allowNull: false,
        defaultValue: "UNREAD"
        
    },
    message: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'notification',
    timestamps: false
});
Notifications.belongsTo(Issues, { foreignKey: 'user_id', as: 'user' });
Notifications.belongsTo(User, { foreignKey: 'equipment_id', as: 'equipment' });
module.exports = Notifications;