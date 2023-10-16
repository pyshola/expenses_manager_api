import {
    User,
    ExpensesCategory,
    Expenses
} from '../config';

import {
    getCurrentUser,
    getSessionToken,
} from '../utils/auth';

/**
 * Expenses Category Class
 */

class ExpensesCategoryController {

   /**
   * Retrieves list of expenses category
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   * @return {Array} The HTTP response object with status code 200 and a JSON
   * array of expenses categrory.
   */
    static async getExpensesCategory(request, response){
        const currentUser = await getCurrentUser(request);
        if (!currentUser) {
            return response.status(401).json({
              error: 'Unauthorized',
            });
        }
        const expensesCategory = await ExpensesCategory.findAll({
            where:{user_id:currentUser.id, delete:false}, order:[["name", "ASC"]]
        });
        const result = []
        for(let exp_cat of expensesCategory){
            result.push({
                "id":exp_cat.id,
                "name":exp_cat.name
            });
        }
        response.status(200).json(result);        
    }

    /**
     * Retrieves list of expenses category
     *
     * @param {Object} request - The request object.
     * @param {Object} response - The response object.
     * @return {Object} The saved expenses category information as JSON
     * object of expenses categrory or an error message as a
     * JSON object..
    */
    static async postExpensesCategory(request, response){
        const currentUser = await getCurrentUser(request);
        if (!currentUser) {
            return response.status(401).json({
              error: 'Unauthorized',
            });
        }
        const {name} = request.body;
        if (!name) {
            return response.status(400).json({ error: 'Missing category name' });
        }
        const capitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

        const exp_f = await ExpensesCategory.findOne({where:{
            "name":capitalized, "user_id":currentUser.id, "delete":false
        }});
        if(exp_f){
            return response.status(401).json({
                error: 'Name already exist!',
            });
        }

        const exp = await ExpensesCategory.create({
            "name":capitalized, "user_id":currentUser.id, delete:false,
            
        });
        await exp.setUser(currentUser.id);        
        response.status(200).json({
            "id":exp.dataValues.id,
            "name":capitalized
        });

    }

    static async updateExpensesCategory(request, response){
        const currentUser = await getCurrentUser(request);
        if (!currentUser) {
            return response.status(401).json({
              error: 'Unauthorized',
            });
        }

        
        const {name} = request.body;
        if (!name) {
            return response.status(400).json({ error: 'Missing category name' });
        }
        const capitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

        const exp_f = await ExpensesCategory.findOne({where:{
            "id":request.params.id, "delete":false
        }});
        if(!exp_f){
            return response.status(400).json({
                error: 'Not Found!',
            });

        }

        const exp = await ExpensesCategory.update({
            "name":capitalized
        }, {where:{id:exp_f.id}});    

        response.status(200).json({
            "id":exp_f.id,
            "name":capitalized
        });

    }

    static async deleteExpensesCategory(request, response){


    }

}

export default ExpensesCategoryController;