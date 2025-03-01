const { Sequelize } = require('sequelize');
const dbUrl = 'postgres://webadmin:IROlxd32713@node76371-jsproject.proen.app.ruk-com.cloud:11636/ReportIssue';

const sequelize = new Sequelize(dbUrl);

module.exports = sequelize;