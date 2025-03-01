const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Equipment = sequelize.define('equipment', {
    equipment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipment_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equipment_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_repair: {
        type: DataTypes.DATE,
        allowNull: true
    },
    repair_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    equipment_add: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'equipment'
});

module.exports = Equipment;