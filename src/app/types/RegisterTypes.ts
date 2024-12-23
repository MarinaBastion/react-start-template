//register user
export type SignUpBody = {
    email: string;
    password: string;
    commandId: string;
  }; 
//response register user
export type AuthResult = {
    token: string;
  };