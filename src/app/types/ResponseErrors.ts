import { data } from "react-router-dom";

export type Extension = {
    code: string
}
export type ErrorItem = {
    extensions: Extension,
    message: string,
    name: string,
    stack: string
} 
export type Errors = {
    errors: ErrorItem[] 
} 
export type ErrorData = {
    data: Errors,
    status: number
} 
export type SuccessRegisterData= {
 profile: Profile,
 token: string,
} 
export type Profile ={
    commandId : string,
    email : string ,
    password: string ,
    signUpDate: string
} 