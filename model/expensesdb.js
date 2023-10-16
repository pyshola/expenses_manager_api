var Sequelize = require('sequelize');
const User = 
module.exports = {
	User_table: function(sequelize) {
		var User = sequelize.define("user", {
			name:Sequelize.TEXT,
			email:Sequelize.TEXT,
			phone:Sequelize.TEXT,
			address: Sequelize.TEXT,
			phone: Sequelize.TEXT,
			password:Sequelize.TEXT,
			token: Sequelize.TEXT,
			token_expire:Sequelize.TEXT,
			status: Sequelize.TEXT,
			disable:Sequelize.BOOLEAN,			
		},{underscored: true});
		return User;
	},
	ExpensesCategory_table: function(sequelize) {
		var ExpensesCategory = sequelize.define("expensescategory", {
			name:Sequelize.TEXT,
			delete: Sequelize.BOOLEAN,
            },  {underscored: true});
        
		return ExpensesCategory;
	},

	Expenses_table: function (sequelize) {
		var Expenses = sequelize.define("expenses", {
			amount: Sequelize.DECIMAL,
			description: Sequelize.TEXT,
			delete: Sequelize.BOOLEAN,
		}, { underscored: true });
		return Expenses;
	},
	
	
	
}