const { Sequelize } = require('sequelize');
const dbUrl = 'postgres://webadmin:IROlxd32713@node76371-jsproject.proen.app.ruk-com.cloud:11636/ReportIssue';
//const dbUrl = 'postgres://webadmin:EHPopd78174@node73591-noderestthu.proen.app.ruk-com.cloud:11798/ReportIssue'
const sequelize = new Sequelize(dbUrl);

module.exports = sequelize;