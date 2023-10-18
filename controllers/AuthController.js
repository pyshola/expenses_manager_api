import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import {
  getSessionToken,
} from '../utils/auth';


import {
  User,
} from '../config';



/**
 * AuthController class to handle authentication
 */
class AuthController {


/**
 * Returns the session token from the request header (x-token).
 *
 * @param {Object} request - The request object containing the headers.
 * @return {string|null} The session token if it exists, otherwise null.
 */
  
  
  /**
   * Returns a session token for a given user by authenticating the user's
   * email and password in the request's query. If successful,
   * returns a 200 status with the token in the response body. If authentication
   * fails, returns a 401 status with an error message in the response body.
   *
   * @param {Object} request - the HTTP request object
   * @param {Object} response - the HTTP response object
   * @return {Promise} a promise that resolves to the session token or rejects
   * with an error
   */
  static async getConnect(request, response) {
    const { email, password } = request.query;
    if (!email) {
      return response.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Missing password' });
    }
    const user = await User.findOne({where:{email:email}});
    if (!user) { 
      return response.status(401).json({
        error: 'Unauthorized',
      });
    }
    const hashedPassword = sha1(password);
    if (user.password !== hashedPassword) { 
      return response.status(401).json({
        error: 'Unauthorized, Invalid email or password!',
      });
    }
    const token = uuidv4();
    const key = `sk_${token}`;
    await User.update({token:key, status:"Active"}, {where:{id:user.id}});
    
    return response.status(201).json({
      apiKey:key,
      message:'Api key regenerated'
    });
  }

  /**
   * Deletes the session token of a user and logs them out.
   *
   * @param {Object} request - the request object from the client
   * @param {Object} response - the response object to send to the client
   * @return {Object} - a 204 status code if successful, otherwise a 401 status
   * code with an error message
   */
  static async getDisconnect(request, response) {
    const token = getSessionToken(request);
    if (!token) {
      return response.status(401).json({
        error: 'Unauthorized',
      });
    }
    const user = await User.findOne({where:{token:token}});
    if (!user) { 
      return response.status(401).json({
        error: 'Unauthorized',
      });
    }
    await User.update({token:null, status:"Disconnect"}, {where:{id:user.id}});
    return response.sendStatus(204);
  }

  /**
   * Asynchronously retrieves the authenticated user's information from the
   * session token.
   *
   * @param {Object} request - The HTTP request object.
   * @param {Object} response - The HTTP response object.
   * @return {Object} Returns a JSON response with the authenticated user's
   * information on success, or an error message with a 401 status code if the
   * user is unauthorized.
   */
  static async getMe(request, response) {
    const token = getSessionToken(request);
    if(!token){
        return response.status(401).json({
        error: 'Unauthorizeds',
      });
    }
    //console.log(token)

    const user = await User.findOne({where:{token:token, status:"Active"}});
    if (!user) { 
      return response.status(401).json({
        error: 'Unauthorized',
      });
    }
    return response.status(200).json({ email: user.email,
      name:user.name, phone:user.phone
    });

    
  }
}

export default AuthController;
