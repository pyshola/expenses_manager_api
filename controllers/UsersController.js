import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import {
  User
} from '../config';


/**
 * UsersController class
 */
class UsersController {
  /**
   * Handles the creation of a new user.
   *
   * @param {Object} request - The request object containing the user's email
   * and password.
   * @param {Object} response - The response object.
   * @return {Object} The response object containing the newly created user's
   * data.
   */
  static async postNew(request, response) {
    const {name, phone, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Missing name' });
    }
    if (!phone) {
      return response.status(400).json({ error: 'Missing phone' });
    }
    if (!email) {
      return response.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Missing password' });
    }

    const existingUser = await User.findOne({where:{email:email}});
    if (existingUser) {
      return response.status(400).json({ error: 'Already exist' });
    }
    const hashedPassword = sha1(password);
    const token = uuidv4();
    const key = `sk_${token}`;
    const newUser = await User.create({name:name, email:email,
    password:hashedPassword, phone:phone, token:key, disable:false, status:'Active'});

    return response.status(201).json({
      apiKey:key,
      message:'Account created successful, use your api key to manage expenses'
    });

  }
}

export default UsersController;
