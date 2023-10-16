import express, { Router } from 'express';
import router from './routes';

const app = express();
//const db = require("./model/expensesdb");



app.use(express.json());
app.use(router);
// db.sequelize.sync({ force: false }).then(function () {
//     app.listen(process.env.PORT || 9999, function () {
//       console.log("server is successfully running!");
//     });
// });

app.listen(process.env.PORT || 9999);

export default app;

