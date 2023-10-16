import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';

import {
  User,
} from '../config';

/**
 * Returns the session token from the request header (x-token).
 *
 * @param {Object} request - The request object containing the headers.
 * @return {string|null} The session token if it exists, otherwise null.
*/

export function getSessionToken(request) {
    const xHeader = request.headers['x-token'];
    if (!xHeader) { return null; }
    return xHeader;
}
  
  
  /**
   * Retrieves the current user associated with the given session token.
   *
   * @param {Object} request - The request object that contains the session token.
   * @return {Promise<Object|null>} - A promise that resolves with the user object
   * if the session token is valid, otherwise null.
   */
  export async function getCurrentUser(request) {
    const token = getSessionToken(request);
    if (!token) { return null; }
    const user = await User.findOne({where:{token:token, status:"Active"}});
    if (!user) { return null; }
    return user;
  }
  