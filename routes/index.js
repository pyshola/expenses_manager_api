import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import ExpensesCategoryController from '../controllers/ExpensesCategoryController';
import ExpensesController from '../controllers/ExpensesController'

const router = Router();



router.post('/api/users', UsersController.postNew);
router.get('/api/connect', AuthController.getConnect);
router.get('/api/disconnect', AuthController.getDisconnect);
router.get('/api/users/me', AuthController.getMe);

/*
* Add new Expenses Category 
*/
router.post('/api/expensescategory', ExpensesCategoryController.postExpensesCategory);

/*
* Get list of expenses categroy
 */
router.get('/api/expensescategory', ExpensesCategoryController.getExpensesCategory);

/*
* Update expenses category by id 
*/
router.put('/api/expensescategory/:id', ExpensesCategoryController.updateExpensesCategory);

/*
* Delete Expenses Category by Id
*/
router.delete('/api/expensescategory/:id', ExpensesCategoryController.deleteExpensesCategory);


/*
*Add expenses
*/
router.post('/api/expenses', ExpensesController.postExpenses);

/*
*Get List of expenses
*/
router.get('/api/expenses', ExpensesController.getExpenses);

/*
*Update List of expenses
*/
router.put('/api/expenses/:id', ExpensesController.updateExpenses);

/*
*Delete List of expenses
*/
router.delete('/api/expenses/:id', ExpensesController.deleteExpenses);

/*
*Delete List of expenses
*/
router.get('/api/expenses/category', ExpensesController.getExpensesByCategory);




router.get('*', function(req, res, next) {
    res.status(400).json({ message: 'Not Found' })
});
  
router.post('*', function(req, res, next) {
    res.status(400).json({ message: 'Not Found' })
});
  
router.put('*', function(req, res, next) {
    res.status(400).json({ message: 'Not Found' })      
});


export default router;