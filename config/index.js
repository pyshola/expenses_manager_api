import Sequelize from "sequelize";


var exports = module.exports = {};	
import model from '../model/expensesdb';


const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_DATABASE = process.env.DB_DATABASE || 'expensesdb';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || '';


var sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
{dialectOptions: {connectTimeout: 100000},
logging: false, pool:{max: 30,  idle: 30000,  acquire: 100000},
retry: { match: [
    /SequelizeConnectionError/,
    /SequelizeConnectionRefusedError/,
    /SequelizeHostNotFoundError/,
    /SequelizeHostNotReachableError/,
    /SequelizeInvalidConnectionError/,
    /SequelizeConnectionTimedOutError/
  ],
  timeout: 100000,
  max: Infinity
}});


const User = model.User_table(sequelize);
const ExpensesCategory = model.ExpensesCategory_table(sequelize);
const Expenses = model.Expenses_table(sequelize);


Expenses.belongsTo(User);
Expenses.belongsTo(ExpensesCategory);
ExpensesCategory.belongsTo(User);
ExpensesCategory.hasMany(Expenses);

sequelize.sync().then(() => {
  console.log('Table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});


const db = sequelize
module.exports = {
  db,
  User,
  ExpensesCategory,
  Expenses
}

