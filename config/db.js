const { Sequelize } = require('sequelize');
//const dbUrl = 'postgres://webadmin:IYOhba51267@node76611-jsproject.proen.app.ruk-com.cloud:11620/ReportIssue';
//const dbUrl = 'postgres://webadmin:KYMhge41918@node77103-jsproject.proen.app.ruk-com.cloud:11850/ReportIssue'
const dbUrl = 'postgres://webadmin:PMEpce71941@10.104.13.224:5432/ReportIssue'
//const dbUrl = 'postgres://webadmin:KYMhge41918@10.104.6.80:11850/ReportIssue'
const sequelize = new Sequelize(dbUrl);
sequelize.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.error("Database connection error:", err));

module.exports = sequelize;