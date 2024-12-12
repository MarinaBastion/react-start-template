
import data from './data.json/data.json';
import {User} from "../store/auth"
// API function to authenticate user
export const authenticateUser = async (email: string, password: string) => {
  try {
    let users: User[] = data;
    let user = users.find(x => x.email == email);
    return user;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred during login');
  }
};