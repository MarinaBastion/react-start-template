
import data from './data.json/data.json';
//import {User} from "../store/auth"
import {AuthResult} from "../types/RegisterTypes"
// API function to authenticate user
export const authenticateUser = async (email: string, password: string) => {
  try {
    
     const response = await fetch('http://19429ba06ff2.vps.myjino.ru/api/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({email, password})
      })
      .then((res) => 
        res.json());
      return response;
    // let users: User[] = data;
    // let user = users.find(x => x.email == email);
    // return user;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred during login');
  }
};

export const getProfile = async (token: string) => {
  try {
     const response = await fetch('http://19429ba06ff2.vps.myjino.ru/api/signin',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => 
      res.json());
    return response;
    // let users: User[] = data;
    // let user = users.find(x => x.email == email);
    // return user;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred during login');
  }
};