import {
    getCurrentUser,
    getSessionToken,
} from '../utils/auth';
const { Op } = require("sequelize");
import {
    User,
    ExpensesCategory,
    Expenses
} from '../config';

import moment from 'moment';
  

/**
 * Expenses Class
 */

class ExpensesController {
    /**
   * Retrieves list of expenses
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   * @return {Array} The HTTP response object with status code 200 and a JSON
   * array of expenses.
   */
    static async getExpenses(request, response){
        const currentUser = await getCurrentUser(request);
        if (!currentUser) {
            return response.status(401).json({
              error: 'Unauthorized',
            });
        }
        var {start, end} = request.query;
        if(!start){
            start = moment(new Date().setHours(0,0,0,0)).format()
        }
        else{
            start = moment(new Date(req.query.start).setHours(0,0,0,0)).format()
        }

        if(!end){
            end = moment(new Date().setHours(24,0,0,0)).format()
        }
        else{
            end = moment(new Date(req.query.end).setHours(24,0,0,0)).format()
        }
        const query = {
            delete:false,
            created_at:{ [Op.between]: [start, end] }
        }
        //console.log(query)
        // const expenses = await Expenses.findAll({
        //     where:query
        // });
        const expenses = await Expenses.findAll(
            {where:query, include:[{model:ExpensesCategory, 
                 right:true}]});
        
        console.log(expenses)

        const result = []
        for(let exp of expenses){
            //const cat = await exp.getExpensesCategory()
            result.push({
                "id":exp.id,
                "category":exp.expensescategory.name,
                "amount":exp.amount,
                "description":exp.description,
                "created_at":moment(exp.created_at).format('YYYY-MM-DD HH:mm')
                
            });
        }
        response.status(200).json(result);  
    }

    /**
     * Post expenses
     *
     * @param {Object} request - The request object.
     * @param {Object} response - The response object.
     * @return {Object} The saved expenses information as JSON
     * object of expenses categrory or an error message as a
     * JSON object..
    */
    static async postExpenses(request, response){
        const currentUser = await getCurrentUser(request);
        if (!currentUser) {
            return response.status(401).json({
              error: 'Unauthorized',
            });
        }
        const {category, amount, description} = request.body;
        if (!amount) {
            return response.status(400).json({ error: 'Missing amount' });
        }
        if(isNaN(amount)){
            return response.status(401).json({ error: 'Amount must be number' });
        }
        if (!category) {
            return response.status(400).json({ error: 'Missing expenses category' });
        }        
        if(!description){
            var desp = ""; 
        }
        else{
            var desp = description
        }
        if(isNaN(category)){
            const expf = await ExpensesCategory.findOne({where:{
                "name":category, "user_id":currentUser.id, "delete":false
            }});
            if(expf){
                var exp_f = expf;
            }
            else{
                const capitalized = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
                const exp_cat = await ExpensesCategory.create({
                    "name":capitalized, "user_id":currentUser.id, delete:false
                });
                await exp_cat.setUser(currentUser.id);  
                var exp_f = exp_cat.dataValues;
            }
        }
        else{
            var exp_f = await ExpensesCategory.findOne({where:{
                "id":category, "user_id":currentUser.id, "delete":false
            }});
            if(!exp_f){
                return response.status(401).json({
                    error: 'Expenses category not found!',
                });
            }

        }
        
        const exp = await Expenses.create({
            "amount":amount, "description":description, delete:false,
            expensescategoryId:exp_f.id
        });
        await exp.setUser(currentUser.id); 
        //await exp.setExpensesCategory(exp_f.id);
           
        

        response.status(200).json({
            "id":exp.dataValues.id,
            "amount":amount,
            "description":exp.dataValues.description,
            "category":exp_f.name,
            "created_at":moment(exp.dataValues.created_at).format('YYYY-MM-DD h:mm')
            
        });


    }

    /**
   * Update expenses
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   * @param {id} request/:id - The expenses id.
   * @return {Object} The HTTP response object with status code 200 and a JSON
   * object of updated expenses.
   */
    static async updateExpenses(request, response){
        const currentUser = await getCurrentUser(request);
        if (!currentUser) {
            return response.status(401).json({
              error: 'Unauthorized',
            });
        }
        const {category, amount, description} = request.body;
        if (!amount) {
            return response.status(400).json({ error: 'Missing amount' });
        }
        if(isNaN(amount)){
            return response.status(401).json({ error: 'Amount must be number' });
        }
        if (!category) {
            return response.status(400).json({ error: 'Missing expenses category' });
        }        
        if(!description){
            var desp = ""; 
        }
        else{
            var desp = description
        }
        if(isNaN(category)){
            const expf = await ExpensesCategory.findOne({where:{
                "name":category, "user_id":currentUser.id, "delete":false
            }});
            if(expf){
                var exp_f = expf;
            }
            else{
                const capitalized = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
                const exp_cat = await ExpensesCategory.create({
                    "name":capitalized, "user_id":currentUser.id, delete:false
                });
                await exp_cat.setUser(currentUser.id);  
                var exp_f = exp_cat.dataValues;
            }
        }
        else{
            var exp_f = await ExpensesCategory.findOne({where:{
                "id":category, "user_id":currentUser.id, "delete":false
            }});
            if(!exp_f){
                return response.status(401).json({
                    error: 'Expenses category not found!',
                });
            }

        }
        var exp_info = await Expenses.findOne({where:{
            "id":request.params.id, user_id:currentUser.id, "delete":false
        }});
        if(!exp_info){
            return response.status(400).json({
                error: 'Not Found!',
            });

        }
        const exp = await Expenses.update({
            "amount":amount, "description":description, expensescategoryId:exp_f.id
        }, {where:{id:exp_info.id}});
        
        //await exp_info.setExpensesCategory(exp_f.id);
        //console.log(exp_info)
        exp_info = await Expenses.findOne({where:{
            "id":request.params.id, "delete":false
        }});
        
        response.status(200).json({
            "id":exp_info.id,
            "amount":exp_info.amount,
            "description":exp_info.description,
            "category":exp_f.name,
            "created_at":moment(exp_info.created_at).format('YYYY-MM-DD HH:mm')
        });

    }

    /**
   * Delete expenses
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   * @param {id} request/:id - The expenses id.
   * @return {Object} The HTTP response object with status code 200 and a JSON
   * message.
   */

    static async deleteExpenses(request, response){
        const currentUser = await getCurrentUser(request);
        if (!currentUser) {
            return response.status(401).json({
              error: 'Unauthorized',
            });
        }
        var exp_info = await Expenses.findOne({where:{
            "id":request.params.id, user_id:currentUser.id, "delete":false
        }});
        if(!exp_info){
            return response.status(400).json({
                error: 'Not Found!',
            });

        }
        const exp = await Expenses.update({
            "delete":true
        }, {where:{id:exp_info.id}});

        return response.status(204)
    }

    

    /**
   * Update expenses
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   * @return {Array} The HTTP response object with status code 200 and a JSON
   * array of expenses summary by category.
   */
    static async getExpensesByCategory(request, response ){
        const currentUser = await getCurrentUser(request);
        if (!currentUser) {
            return response.status(401).json({
              error: 'Unauthorized',
            });
        }
        var {start, end} = request.query;
        if(!start){
            start = moment(new Date(2000, 1, 1).setHours(0,0,0,0)).format()
        }
        else{
            start = moment(new Date(req.query.start).setHours(0,0,0,0)).format()
        }

        if(!end){
            end = moment(new Date().setHours(24,0,0,0)).format()
        }
        else{
            end = moment(new Date(req.query.end).setHours(24,0,0,0)).format()
        }
        const query = {
            delete:false,
            created_at:{ [Op.between]: [start, end] }
        }
        
        const expenses_categories = await ExpensesCategory.findAll(
            {where:query, include:[{model:Expenses}]});
        
        const result = {};
        for(let expenses_category of expenses_categories){
            
            if (result[expenses_category.name] === undefined) {
                var amount = 0;
                for(let expenses of expenses_category.expenses){
                    let amt = expenses.amount || 0;
                    amount = parseFloat(amt) + parseFloat(amount);
                }
                result[expenses_category.name] = amount;
            }
            else{
                var amount = result[expenses_category.name];
                for(let expenses of expenses_category.expenses){
                    let amt = expenses.amount || 0;
                    amount = parseFloat(amt) + parseFloat(amount);
                }
                result[expenses_category.name] = amount;
            }

        }
        //console.log(result);   
        response.status(200).json(result);      


    }

}


export default ExpensesController;